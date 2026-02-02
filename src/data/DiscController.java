package com.frexor.pas.controller;

import java.awt.Color;
import java.awt.Desktop;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;

import javax.imageio.ImageIO;

import org.apache.commons.lang.WordUtils;
import org.apache.pdfbox.io.IOUtils;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDTrueTypeFont;
import org.apache.pdfbox.pdmodel.graphics.image.PDImageXObject;

import com.frexor.pas.command.QuizCommand;
import com.frexor.pas.model.DiscModel;
import com.frexor.pas.model.MenuModel;
import com.frexor.pas.service.FormulaResultService;
import com.frexor.pas.service.FormulaResultServiceImpl;
import com.frexor.pas.utils.PageGetter;
import com.frexor.pas.utils.SessionGetter;
import com.frexor.pas.view.ScreenViewHandler;

import javafx.embed.swing.SwingFXUtils;
import javafx.event.EventHandler;
import javafx.fxml.FXML;
import javafx.scene.SnapshotParameters;
import javafx.scene.chart.CategoryAxis;
import javafx.scene.chart.LineChart;
import javafx.scene.chart.NumberAxis;
import javafx.scene.chart.XYChart;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.image.WritableImage;
import javafx.scene.input.KeyEvent;
import javafx.scene.layout.GridPane;
import javafx.scene.transform.Transform;
import javafx.stage.FileChooser;
import javafx.stage.FileChooser.ExtensionFilter;
import javafx.util.StringConverter;

public class DiscController extends QuizCommand{
	ScreenViewHandler screenController = new ScreenViewHandler();
    MenuModel model;
	PageGetter page = new PageGetter();
	FormulaResultService service = new FormulaResultServiceImpl();
	HashMap<String, TextField> mapField = new HashMap<String, TextField>();
	DiscModel discModelMost = new DiscModel();
	DiscModel discModelLeast = new DiscModel();
	@FXML
	private GridPane grid;
	
	@FXML
	private Label labelMost;
	@FXML
	private Label leastLabel;
	@FXML
	private Label labelMost1;
	@FXML
	private Label leastLabel1;
	@FXML
	private Label labelMost2;
	@FXML
	private Label leastLabel2;
	@FXML
	private Label labelMost3;
	@FXML
	private Label leastLabel3;
	@FXML
	private LineChart<?, ?> LineChart;
	@FXML
	private LineChart<?, ?> LineChart2;

	@FXML
	private CategoryAxis x;
	
	@FXML
	private NumberAxis y;
	
	@FXML
	private CategoryAxis x2;
	
	@FXML
	private NumberAxis y2;
	
	@FXML
	private Label namaTypeMost;

	@FXML
	private Label nameTypeLeast;
	@FXML
    public void initialize() {
		if(grid != null) {
			Locale.setDefault(SessionGetter.getBundle().getLocale());
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("EEEE, dd MMMM yyyy", SessionGetter.getBundle().getLocale());
			dateField.setValue(LocalDate.now());
			dateField.setConverter(new StringConverter<LocalDate>() {
			
				@Override
				public String toString(LocalDate object) {
					return object.format(formatter);
				}

				@Override
				public LocalDate fromString(String string) {
		            return LocalDate.parse(string, formatter);
				}
				
			});
			limitField(nameField);
			limitField(positionField);
			name.setText(SessionGetter.getPropertyKey("form.name"));
			position.setText(SessionGetter.getPropertyKey("form.position"));
			date.setText(SessionGetter.getPropertyKey("form.date"));
			formMessage.setText(SessionGetter.getPropertyKey("form.message"));
			formTitleDisc.setText(SessionGetter.getPropertyKey("form.title.disc"));
			labelMost.setText(SessionGetter.getPropertyKey("form.label.disc.2"));
			leastLabel.setText(SessionGetter.getPropertyKey("form.label.disc.1"));
			labelMost1.setText(SessionGetter.getPropertyKey("form.label.disc.2"));
			leastLabel1.setText(SessionGetter.getPropertyKey("form.label.disc.1"));
			labelMost2.setText(SessionGetter.getPropertyKey("form.label.disc.2"));
			leastLabel2.setText(SessionGetter.getPropertyKey("form.label.disc.1"));
			labelMost3.setText(SessionGetter.getPropertyKey("form.label.disc.2"));
			leastLabel3.setText(SessionGetter.getPropertyKey("form.label.disc.1"));
			
			mapField = declare();
		/*	grid.getChildren().forEach(item -> {
	            item.setOnKeyReleased(new EventHandler<KeyEvent>() {
	                @Override
	                public void handle(KeyEvent event) {
	                	service.validateTextField(mapField, 48, "disc" );
	                }
	            });
			 });*/
			btnSubmit.setText(SessionGetter.getPropertyKey("button.submit"));
		}else {
			labelPrint.setText(SessionGetter.getPropertyKey("form.penilaian.print"));
			labelGuide.setText(SessionGetter.getPropertyKey("form.penilaian.guide"));
			labelForm.setText(SessionGetter.getPropertyKey("form.penilaian.form"));
		}
		
		btnBack.setText(SessionGetter.getPropertyKey("button.back"));
		
    }
	
	@FXML
	public void  handleNext() {
		screenController.initPage(page.GETPAGE(4), "disc", SessionGetter.getStage());
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@FXML
	public void handleSubmit() throws IOException {
		service.createFolder("DISC");
		SessionGetter.setName(nameField.getText());
		SessionGetter.setPosition(positionField.getText());
		SessionGetter.setDate(DateTimeFormatter.ofPattern("EEEE, dd MMMM yyyy", SessionGetter.getBundle().getLocale()).format(dateField.getValue()));
		SessionGetter.setDateFileName(DateTimeFormatter.ofPattern("yyyy-MM-dd", SessionGetter.getBundle().getLocale()).format(dateField.getValue()));
		HashMap<Integer, String> discAnswerKeyMost = defineDiscAnswerMost();
		HashMap<Integer, String> discAnswerKeyLeast = defineDiscAnswerLeast();
		konversiDiscMostDict();
		konversiDiscLeastDict();
		List<DiscModel> resultDisc = service.formulaDisc(mapField, discAnswerKeyMost,  discAnswerKeyLeast);
		discModelLeast = resultDisc.get(0);
		discModelMost = resultDisc.get(1);
		if(nameField.getText().equalsIgnoreCase("") || positionField.getText().equalsIgnoreCase("")) {
			service.showAlertWarning();
		}else {
			generateReslt(discModelLeast, discModelMost);
			//SessionGetter.setResultDisc(resultDisc);
			//SessionGetter.SETIQ(resultD);
			//screenController.initPage(page.GETPAGE(9), "report", SessionGetter.getStage());
	    	//screenController.initPage(page.GETPAGE(9), "report", SessionGetter.getStage());
	    	
			DiscModel modelLeast = SessionGetter.getResultDiscLeast();
			DiscModel modelMost = SessionGetter.getResultDiscMost();
			
			XYChart.Series series = new XYChart.Series();
			XYChart.Series series2 = new XYChart.Series();
			LineChart.getData().clear();
			LineChart2.getData().clear();
			series.getData().clear();
			series2.getData().clear();
			series.getData().add(new XYChart.Data<>("D", modelMost.getNode1()));
			series.getData().add(new XYChart.Data<>("I", modelMost.getNode2()));
			series.getData().add(new XYChart.Data<>("S", modelMost.getNode3()));
			series.getData().add(new XYChart.Data<>("C", modelMost.getNode4()));

			series2.getData().add(new XYChart.Data<>("D", modelLeast.getNode1()));
			series2.getData().add(new XYChart.Data<>("I", modelLeast.getNode2()));
			series2.getData().add(new XYChart.Data<>("S", modelLeast.getNode3()));
			series2.getData().add(new XYChart.Data<>("C", modelLeast.getNode4()));
			
			LineChart.getData().add(series);
			LineChart2.getData().add(series2);
			y.setAutoRanging(false);
			y.setLowerBound(0);
			y.setUpperBound(100);
			y.setTickUnit(50);
			y2.setAutoRanging(false);
			y2.setLowerBound(0);
			y2.setUpperBound(100);
			y2.setTickUnit(50);
			y.applyCss();
			y2.applyCss();
			x.applyCss();
			x2.applyCss();
			LineChart.setCreateSymbols(true);
			LineChart2.setCreateSymbols(true);
			LineChart.getStylesheets().add(getClass().getResource("chart.css").toExternalForm());
			LineChart2.getStylesheets().add(getClass().getResource("chart.css").toExternalForm());
			
			LineChart.applyCss();
			LineChart2.applyCss();
			
				LineChart.setAnimated(false);
				LineChart.setVisible(true);
				SnapshotParameters spa = new SnapshotParameters();
				spa.setTransform(Transform.scale(3, 4));
				WritableImage nodeshot = LineChart.snapshot(spa, null);
				LineChart.setVisible(false);
				String path = System.getProperty("user.home") + File.separator + "Documents" + File.separator + "Frexor PAS" + File.separator + "DISC" + File.separator;
				File file = new File(path+"chart.png");
				try {
					if(file.exists()) {
						file.delete();
					}
					ImageIO.write(SwingFXUtils.fromFXImage(nodeshot, null), "png", file);
				} catch (IOException e) {
					e.printStackTrace();
				}
			

				

				spa.setTransform(Transform.scale(3, 4));

				// stage.setScene(screen);
				LineChart2.setAnimated(false);
				LineChart2.setVisible(true);
				
				// stage.show();

				WritableImage nodeshot2 = LineChart2.snapshot(spa, null);
				LineChart2.setVisible(false);
				File file2 = new File(path+"chart2.png");

				try {
					if(file2.exists()) {
						file2.delete();
					}
					ImageIO.write(SwingFXUtils.fromFXImage(nodeshot2, null), "png", file2);

				} catch (IOException e) {
					e.printStackTrace();
				}
				
				
				generate(modelLeast, modelMost);
		}
		
	}
	
	@FXML
	public void handleBackToMenu() {
    	screenController.initPage(page.GETPAGE(10), "disc", SessionGetter.getStage());
	}
	@FXML
	public void handleBackToMainPage() {
		screenController.initPage(page.GETPAGE(3), "main", SessionGetter.getStage());
	}
	@FXML
	public void handleTutorial() throws IOException {
		 Desktop desktop = Desktop.getDesktop();
	        InputStream is =  getClass().getResourceAsStream(SessionGetter.getPropertyKey("guide.disc"));
	        byte[] data = IOUtils.toByteArray(is);
	        is.read(data);
	        is.close();
	        File temp =  new File(System.getProperty("java.io.tmpdir")+File.separator+SessionGetter.getPropertyKey("guide.disc"));	        
	        File t =  new File(System.getProperty("java.io.tmpdir")+File.separator+SessionGetter.getPropertyKey("guide.disc"));
	        if(temp.exists()){
	     	   if(temp.renameTo(t)){
	           	 FileOutputStream fos = new FileOutputStream(temp);
	                fos.write(data);
	                fos.flush();
	                fos.close();
	           	desktop.open(temp);
	           }else {
	           	 service.showAlertOpenedDocument();
	           }
	        }else {
	     	   FileOutputStream fos = new FileOutputStream(temp);
	            fos.write(data);
	            fos.flush();
	            fos.close();
	       	desktop.open(temp);
	        }
	         
	}
	
	@FXML
	public void handleShowForm() throws IOException {
		Desktop desktop = Desktop.getDesktop();
        InputStream is =  getClass().getResourceAsStream(SessionGetter.getPropertyKey("pdf.name.disc"));
        byte[] data = IOUtils.toByteArray(is);
        is.read(data);
        is.close();
        File temp =  new File(System.getProperty("java.io.tmpdir")+File.separator+SessionGetter.getPropertyKey("pdf.name.disc"));
        File t =  new File(System.getProperty("java.io.tmpdir")+File.separator+SessionGetter.getPropertyKey("pdf.name.disc"));

        if(temp.exists()){
     	   if(temp.renameTo(t)){
           	 FileOutputStream fos = new FileOutputStream(temp);
                fos.write(data);
                fos.flush();
                fos.close();
           	desktop.open(temp);
           }else {
           	 service.showAlertOpenedDocument();
           }
        }else {
     	   FileOutputStream fos = new FileOutputStream(temp);
            fos.write(data);
            fos.flush();
            fos.close();
       	desktop.open(temp);
        }
         
	}
	
	private void generateReslt(DiscModel discModelLeast, DiscModel discModelMost) {
		HashMap<String, String> codeTypeMap = new HashMap<String, String>();
		codeTypeMap = getTypeDisc();
		discModelLeast.setNode1(konversiDLeast.get(discModelLeast.getTotalD()));
		discModelLeast.setNode2(konversiILeast.get(discModelLeast.getTotalI()));
		discModelLeast.setNode3(konversiSLeast.get(discModelLeast.getTotalS()));
		discModelLeast.setNode4(konversiCLeast.get(discModelLeast.getTotalC()));

		discModelMost.setNode1(konversiDMost.get(discModelMost.getTotalD()));
		discModelMost.setNode2(konversiIMost.get(discModelMost.getTotalI()));
		discModelMost.setNode3(konversiSMost.get(discModelMost.getTotalS()));
		discModelMost.setNode4(konversiCMost.get(discModelMost.getTotalC()));
		
		if(discModelMost.getNode1()>50) {
			discModelMost.setCodeD("HD");
		}else {
			discModelMost.setCodeD("LD");
		}
		
		if(discModelMost.getNode2()>50) {
			discModelMost.setCodeI("HI");
		}else {
			discModelMost.setCodeI("LI");
		}
		
		if(discModelMost.getNode3()>50) {
			discModelMost.setCodeS("HS");
		}else {
			discModelMost.setCodeS("LS");
		}
		
		if(discModelMost.getNode4()>50) {
			discModelMost.setCodeC("HC");
		}else {
			discModelMost.setCodeC("LC");
		}
		
		
		
		if(discModelLeast.getNode1()>50) {
			discModelLeast.setCodeD("HD");
		}else {
			discModelLeast.setCodeD("LD");
		}
		
		if(discModelLeast.getNode2()>50) {
			discModelLeast.setCodeI("HI");
		}else {
			discModelLeast.setCodeI("LI");
		}
		
		if(discModelLeast.getNode3()>50) {
			discModelLeast.setCodeS("HS");
		}else {
			discModelLeast.setCodeS("LS");
		}
		
		if(discModelLeast.getNode4()>50) {
			discModelLeast.setCodeC("HC");
		}else {
			discModelLeast.setCodeC("LC");
		}
		
		List<Integer> sort = new ArrayList<Integer>();
		List<Integer> sort2 = new ArrayList<Integer>();
		HashMap<Integer, String> mapNode = new HashMap<Integer, String>();
		HashMap<Integer, String> mapNode2 = new HashMap<Integer,String>();

		Integer sortarr[] = {discModelLeast.getNode1(),discModelLeast.getNode2(),discModelLeast.getNode3(),discModelLeast.getNode4()}; 
		int n1 = sortarr.length;
		int temp1 = 0;
		for(int i=0; i < n1; i++){  
            for(int j=1; j < (n1-i); j++){  
                     if(sortarr[j-1] < sortarr[j]){  
                            //swap elements  
                            temp1 = sortarr[j];  
                            sortarr[j] = sortarr[j-1];  
                            sortarr[j-1] = temp1;
                    }  
                     
            }  
		}  
		
		int f1 = 0;
		if(sortarr[0]==discModelLeast.getNode1()) {
			mapNode.put(1, discModelLeast.getCodeD());
			f1 = discModelLeast.getNode1();
		}else if(sortarr[0]==discModelLeast.getNode2()) {
			mapNode.put(1, discModelLeast.getCodeI());
			f1 = discModelLeast.getNode2();

		}else if(sortarr[0]==discModelLeast.getNode3()) {
			mapNode.put(1, discModelLeast.getCodeS());
			f1 = discModelLeast.getNode3();

		}else if(sortarr[0]==discModelLeast.getNode4()) {
			mapNode.put(1, discModelLeast.getCodeC());
			f1 = discModelLeast.getNode4();

		}
		
		int s1 = 0;
		if(discModelLeast.getNode1()==f1) {
			if(sortarr[1]==discModelLeast.getNode2()) {
				mapNode.put(2, discModelLeast.getCodeI());
				s1  = discModelLeast.getNode2();
			}else if(sortarr[1]==discModelLeast.getNode3()) {
				mapNode.put(2, discModelLeast.getCodeS());
				s1  = discModelLeast.getNode3();
			}else if(sortarr[1]==discModelLeast.getNode4()) {
				mapNode.put(2, discModelLeast.getCodeC());
				s1  = discModelLeast.getNode4();
			}
		}else if(discModelLeast.getNode2()==f1) {
			if(sortarr[1]==discModelLeast.getNode1()) {
				mapNode.put(2, discModelLeast.getCodeD());
				s1  = discModelLeast.getNode1();
			}else if(sortarr[1]==discModelLeast.getNode3()) {
				mapNode.put(2, discModelLeast.getCodeS());
				s1  = discModelLeast.getNode3();
			}else if(sortarr[1]==discModelLeast.getNode4()) {
				mapNode.put(2, discModelLeast.getCodeC());
				s1  = discModelLeast.getNode4();
			}
		} else if(discModelLeast.getNode3()==f1) {
			if(sortarr[1]==discModelLeast.getNode1()) {
				mapNode.put(2, discModelLeast.getCodeD());
				s1  = discModelLeast.getNode2();
			}else if(sortarr[1]==discModelLeast.getNode2()) {
				mapNode.put(2, discModelLeast.getCodeI());
				s1  = discModelLeast.getNode3();
			}else if(sortarr[1]==discModelLeast.getNode4()) {
				mapNode.put(2, discModelLeast.getCodeC());
				s1  = discModelLeast.getNode4();
			}
		}else if(discModelLeast.getNode4()==f1) {
			if(sortarr[1]==discModelLeast.getNode1()) {
				mapNode.put(2, discModelLeast.getCodeD());
				s1  = discModelLeast.getNode1();
			}else if(sortarr[1]==discModelLeast.getNode2()) {
				mapNode.put(2, discModelLeast.getCodeI());
				s1  = discModelLeast.getNode2();
			}else if(sortarr[1]==discModelLeast.getNode3()) {
				mapNode.put(2, discModelLeast.getCodeS());
				s1  = discModelLeast.getNode3();
			}
		}
		else {
			if(sortarr[1]==discModelLeast.getNode1()) {
				mapNode.put(2, discModelLeast.getCodeD());
				s1  = discModelLeast.getNode1();

			}else if(sortarr[1]==discModelLeast.getNode2()) {
				mapNode.put(2, discModelLeast.getCodeI());
				s1  = discModelLeast.getNode2();

			}else if(sortarr[1]==discModelLeast.getNode3()) {
				mapNode.put(2, discModelLeast.getCodeS());
				s1  = discModelLeast.getNode3();

			}else if(sortarr[1]==discModelLeast.getNode4()) {
				mapNode.put(2, discModelLeast.getCodeC());
				s1  = discModelLeast.getNode4();
			}
		}
		
		int t1 = 0;
		if(discModelLeast.getNode1()==s1) {
			if(sortarr[2]==discModelLeast.getNode2()) {
				mapNode.put(3, discModelLeast.getCodeI());
				t1 = discModelLeast.getNode2();
			}else if(sortarr[2]==discModelLeast.getNode3()) {
				mapNode.put(3, discModelLeast.getCodeS());
				t1 = discModelLeast.getNode3();
			}else if(sortarr[2]==discModelLeast.getNode4()) {
				mapNode.put(3, discModelLeast.getCodeC());
				t1 = discModelLeast.getNode4();
			}
		}else if(discModelLeast.getNode2()==s1) {
			if(sortarr[2]==discModelLeast.getNode1()) {
				mapNode.put(3, discModelLeast.getCodeD());
				t1 = discModelLeast.getNode1();
			}else if(sortarr[2]==discModelLeast.getNode3()) {
				mapNode.put(3, discModelLeast.getCodeS());
				t1 = discModelLeast.getNode3();
			}else if(sortarr[2]==discModelLeast.getNode4()) {
				mapNode.put(3, discModelLeast.getCodeC());
				t1 = discModelLeast.getNode4();
			}
		} else if(discModelLeast.getNode3()==s1) {
			if(sortarr[2]==discModelLeast.getNode1()) {
				mapNode.put(3, discModelLeast.getCodeD());
				t1 = discModelLeast.getNode1();
			}else if(sortarr[2]==discModelLeast.getNode2()) {
				mapNode.put(3, discModelLeast.getCodeI());
				t1 = discModelLeast.getNode2();
			}else if(sortarr[2]==discModelLeast.getNode4()) {
				mapNode.put(3, discModelLeast.getCodeC());
				t1 = discModelLeast.getNode4();
			}
		}else if(discModelLeast.getNode4()==s1) {
			if(sortarr[2]==discModelLeast.getNode1()) {
				mapNode.put(3, discModelLeast.getCodeD());
				t1 = discModelLeast.getNode1();
			}else if(sortarr[2]==discModelLeast.getNode2()) {
				mapNode.put(3, discModelLeast.getCodeI());
				t1 = discModelLeast.getNode2();
			}else if(sortarr[2]==discModelLeast.getNode3()) {
				mapNode.put(3, discModelLeast.getCodeS());
				t1 = discModelLeast.getNode3();
			}
		}else {
			if(sortarr[2]==discModelLeast.getNode1()) {
				mapNode.put(3, discModelLeast.getCodeD());
				t1 = discModelLeast.getNode1();

			}else if(sortarr[2]==discModelLeast.getNode2()) {
				mapNode.put(3, discModelLeast.getCodeI());
				t1 = discModelLeast.getNode2();

			}else if(sortarr[2]==discModelLeast.getNode3()) {
				mapNode.put(3, discModelLeast.getCodeS());
				t1 = discModelLeast.getNode3();

			}else if(sortarr[2]==discModelLeast.getNode4()) {
				mapNode.put(3, discModelLeast.getCodeC());
				t1 = discModelLeast.getNode4();

			}
		}
		
		
		if(discModelLeast.getNode1()==t1) {
			if(sortarr[3]==discModelLeast.getNode2()) {
				mapNode.put(4, discModelLeast.getCodeI());
			}else if(sortarr[3]==discModelLeast.getNode3()) {
				mapNode.put(4, discModelLeast.getCodeS());
			}else if(sortarr[3]==discModelLeast.getNode4()) {
				mapNode.put(4, discModelLeast.getCodeC());
			}
		}else if(discModelLeast.getNode2()==t1) {
			if(sortarr[3]==discModelLeast.getNode1()) {
				mapNode.put(4, discModelLeast.getCodeD());
			}else if(sortarr[3]==discModelLeast.getNode3()) {
				mapNode.put(4, discModelLeast.getCodeS());
			}else if(sortarr[3]==discModelLeast.getNode4()) {
				mapNode.put(4, discModelLeast.getCodeC());
			}
		} else if(discModelLeast.getNode3()==t1) {
			if(sortarr[3]==discModelLeast.getNode1()) {
				mapNode.put(4, discModelLeast.getCodeD());
			}else if(sortarr[3]==discModelLeast.getNode2()) {
				mapNode.put(4, discModelLeast.getCodeI());
			}else if(sortarr[3]==discModelLeast.getNode4()) {
				mapNode.put(4, discModelLeast.getCodeC());
			}
		}else if(discModelLeast.getNode4()==t1) {
			if(sortarr[3]==discModelLeast.getNode1()) {
				mapNode.put(4, discModelLeast.getCodeD());
			}else if(sortarr[3]==discModelLeast.getNode2()) {
				mapNode.put(4, discModelLeast.getCodeI());
			}else if(sortarr[3]==discModelLeast.getNode3()) {
				mapNode.put(4, discModelLeast.getCodeS());
			}
		}else {
			if(sortarr[3]==discModelLeast.getNode1()) {
				mapNode.put(4, discModelLeast.getCodeD());
			}else if(sortarr[3]==discModelLeast.getNode2()) {
				mapNode.put(4, discModelLeast.getCodeI());
			}else if(sortarr[3]==discModelLeast.getNode3()) {
				mapNode.put(4, discModelLeast.getCodeS());
			}else if(sortarr[3]==discModelLeast.getNode4()) {
				mapNode.put(4, discModelLeast.getCodeC());
			}
		}
		
		mapNode.put(discModelLeast.getNode1(), discModelLeast.getCodeD());
		mapNode.put(discModelLeast.getNode2(), discModelLeast.getCodeI());
		mapNode.put(discModelLeast.getNode3(), discModelLeast.getCodeS());
		mapNode.put(discModelLeast.getNode4(), discModelLeast.getCodeC());
	
		
		
		
		Integer sortarr2[] = {discModelMost.getNode1(),discModelMost.getNode2(),discModelMost.getNode3(),discModelMost.getNode4()}; 
		int n = sortarr2.length;
		int temp = 0;
		for(int i=0; i < n; i++){  
            for(int j=1; j < (n-i); j++){  
                     if(sortarr2[j-1] < sortarr2[j]){  
                            //swap elements  
                            temp = sortarr2[j];  
                            sortarr2[j] = sortarr2[j-1];  
                            sortarr2[j-1] = temp;
                    }  
                     
            }  
		}  
		
		int f = 0;
		if(sortarr2[0]==discModelMost.getNode1()) {
			mapNode2.put(1, discModelMost.getCodeD());
			f = discModelMost.getNode1();
		}else if(sortarr2[0]==discModelMost.getNode2()) {
			mapNode2.put(1, discModelMost.getCodeI());
			f = discModelMost.getNode2();

		}else if(sortarr2[0]==discModelMost.getNode3()) {
			mapNode2.put(1, discModelMost.getCodeS());
			f = discModelMost.getNode3();

		}else if(sortarr2[0]==discModelMost.getNode4()) {
			mapNode2.put(1, discModelMost.getCodeC());
			f = discModelMost.getNode4();

		}
		
		int s = 0;
		if(discModelMost.getNode1()==f) {
			if(sortarr2[1]==discModelMost.getNode2()) {
				mapNode2.put(2, discModelMost.getCodeI());
				s = discModelMost.getNode2();
			}else if(sortarr2[1]==discModelMost.getNode3()) {
				mapNode2.put(2, discModelMost.getCodeS());
				s = discModelMost.getNode3();
			}else if(sortarr2[1]==discModelMost.getNode4()) {
				mapNode2.put(2, discModelMost.getCodeC());
				s = discModelMost.getNode4();
			}
		}else if(discModelMost.getNode2()==f) {
			if(sortarr2[1]==discModelMost.getNode1()) {
				mapNode2.put(2, discModelMost.getCodeD());
				s = discModelMost.getNode1();
			}else if(sortarr2[1]==discModelMost.getNode3()) {
				mapNode2.put(2, discModelMost.getCodeS());
				s = discModelMost.getNode3();
			}else if(sortarr2[1]==discModelMost.getNode4()) {
				mapNode2.put(2, discModelMost.getCodeC());
				s = discModelMost.getNode4();
			}
		} else if(discModelMost.getNode3()==f) {
			if(sortarr2[1]==discModelMost.getNode1()) {
				mapNode2.put(2, discModelMost.getCodeD());
				s = discModelMost.getNode1();
			}else if(sortarr2[1]==discModelMost.getNode2()) {
				mapNode2.put(2, discModelMost.getCodeI());
				s = discModelMost.getNode2();
			}else if(sortarr2[1]==discModelMost.getNode4()) {
				mapNode2.put(2, discModelMost.getCodeC());
				s = discModelMost.getNode4();
			}
		}else if(discModelMost.getNode4()==f) {
			if(sortarr2[1]==discModelMost.getNode1()) {
				mapNode2.put(2, discModelMost.getCodeD());
				s = discModelMost.getNode1();
			}else if(sortarr2[1]==discModelMost.getNode2()) {
				mapNode2.put(2, discModelMost.getCodeI());
				s = discModelMost.getNode2();
			}else if(sortarr2[1]==discModelMost.getNode3()) {
				mapNode2.put(2, discModelMost.getCodeS());
				s = discModelMost.getNode3();
			}
		}
		else {
			if(sortarr2[1]==discModelMost.getNode1()) {
				mapNode2.put(2, discModelMost.getCodeD());
				s = discModelMost.getNode1();

			}else if(sortarr2[1]==discModelMost.getNode2()) {
				mapNode2.put(2, discModelMost.getCodeI());
				s = discModelMost.getNode2();

			}else if(sortarr2[1]==discModelMost.getNode3()) {
				mapNode2.put(2, discModelMost.getCodeS());
				s = discModelMost.getNode3();

			}else if(sortarr2[1]==discModelMost.getNode4()) {
				mapNode2.put(2, discModelMost.getCodeC());
				s = discModelMost.getNode4();
			}
		}
		
		int t = 0;
		if(discModelMost.getNode1()==s) {
			if(sortarr2[2]==discModelMost.getNode2()) {
				mapNode2.put(3, discModelMost.getCodeI());
				t = discModelMost.getNode2();
			}else if(sortarr2[2]==discModelMost.getNode3()) {
				mapNode2.put(3, discModelMost.getCodeS());
				t = discModelMost.getNode3();
			}else if(sortarr2[2]==discModelMost.getNode4()) {
				mapNode2.put(3, discModelMost.getCodeC());
				t = discModelMost.getNode4();
			}
		}else if(discModelMost.getNode2()==s) {
			if(sortarr2[2]==discModelMost.getNode1()) {
				mapNode2.put(3, discModelMost.getCodeD());
				t = discModelMost.getNode1();
			}else if(sortarr2[2]==discModelMost.getNode3()) {
				mapNode2.put(3, discModelMost.getCodeS());
				t = discModelMost.getNode3();
			}else if(sortarr2[2]==discModelMost.getNode4()) {
				mapNode2.put(3, discModelMost.getCodeC());
				t = discModelMost.getNode4();
			}
		} else if(discModelMost.getNode3()==s) {
			if(sortarr2[2]==discModelMost.getNode1()) {
				mapNode2.put(3, discModelMost.getCodeD());
				t = discModelMost.getNode1();
			}else if(sortarr2[2]==discModelMost.getNode2()) {
				mapNode2.put(3, discModelMost.getCodeI());
				t = discModelMost.getNode2();
			}else if(sortarr2[2]==discModelMost.getNode4()) {
				mapNode2.put(3, discModelMost.getCodeC());
				t = discModelMost.getNode4();
			}
		}else if(discModelMost.getNode4()==s) {
			if(sortarr2[2]==discModelMost.getNode1()) {
				mapNode2.put(3, discModelMost.getCodeD());
				t = discModelMost.getNode1();
			}else if(sortarr2[2]==discModelMost.getNode2()) {
				mapNode2.put(3, discModelMost.getCodeI());
				t = discModelMost.getNode2();
			}else if(sortarr2[2]==discModelMost.getNode3()) {
				mapNode2.put(3, discModelMost.getCodeS());
				t = discModelMost.getNode3();
			}
		}else {
			if(sortarr2[2]==discModelMost.getNode1()) {
				mapNode2.put(3, discModelMost.getCodeD());
				t = discModelMost.getNode1();

			}else if(sortarr2[2]==discModelMost.getNode2()) {
				mapNode2.put(3, discModelMost.getCodeI());
				t = discModelMost.getNode2();

			}else if(sortarr2[2]==discModelMost.getNode3()) {
				mapNode2.put(3, discModelMost.getCodeS());
				t = discModelMost.getNode3();

			}else if(sortarr2[2]==discModelMost.getNode4()) {
				mapNode2.put(3, discModelMost.getCodeC());
				t = discModelMost.getNode4();

			}
		}
		System.out.println(sortarr2[2]);
		System.out.println(t);
		if(discModelMost.getNode1()==t) {
			System.out.println(t);
			System.out.println("1");
			System.out.println(discModelMost.getNode1());
			if(sortarr2[3]==discModelMost.getNode2()) {
				mapNode2.put(4, discModelMost.getCodeI());
			}else if(sortarr2[3]==discModelMost.getNode3()) {
				mapNode2.put(4, discModelMost.getCodeS());
			}else if(sortarr2[3]==discModelMost.getNode4()) {
				mapNode2.put(4, discModelMost.getCodeC());
			}
		}else if(discModelMost.getNode2()==t) {
			System.out.println("2");
			System.out.println(discModelMost.getNode2());
			System.out.println(sortarr2[3]);
			if(sortarr2[3]==discModelMost.getNode1()) {
				mapNode2.put(4, discModelMost.getCodeD());
			}else if(sortarr2[3]==discModelMost.getNode3()) {
				mapNode2.put(4, discModelMost.getCodeS());
			}else if(sortarr2[3]==discModelMost.getNode4()) {
				mapNode2.put(4, discModelMost.getCodeC());
			}
		} else if(discModelMost.getNode3()==t) {
			System.out.println("3");
			System.out.println(discModelMost.getNode3());
			System.out.println(sortarr2[3]);
			if(sortarr2[3]==discModelMost.getNode1()) {
				mapNode2.put(4, discModelMost.getCodeD());
			}else if(sortarr2[3]==discModelMost.getNode2()) {
				mapNode2.put(4, discModelMost.getCodeI());
			}else if(sortarr2[3]==discModelMost.getNode4()) {
				mapNode2.put(4, discModelMost.getCodeC());
			}
		}else if(discModelMost.getNode4()==t) {
			System.out.println("4");
			System.out.println(discModelMost.getNode4());

			if(sortarr2[3]==discModelMost.getNode1()) {
				mapNode2.put(4, discModelMost.getCodeD());
			}else if(sortarr2[3]==discModelMost.getNode2()) {
				mapNode2.put(4, discModelMost.getCodeI());
			}else if(sortarr2[3]==discModelMost.getNode3()) {
				mapNode2.put(4, discModelMost.getCodeS());
			}
		}else {
			System.out.println("5");
			if(sortarr2[3]==discModelMost.getNode1()) {
				mapNode2.put(4, discModelMost.getCodeD());
				System.out.println("D");
			}else if(sortarr2[3]==discModelMost.getNode2()) {
				mapNode2.put(4, discModelMost.getCodeI());
				System.out.println("I");
			}else if(sortarr2[3]==discModelMost.getNode3()) {
				mapNode2.put(4, discModelMost.getCodeS());
				System.out.println("S");
			}else if(sortarr2[3]==discModelMost.getNode4()) {
				mapNode2.put(4, discModelMost.getCodeC());
				System.out.println("C");
			}
			System.out.println("DISC");
		}
		
		
		int j = 0;
		  for(int i=0; i < sortarr2.length; i++){  
              System.out.print(sortarr2[i] + " "); 
              
          }  
		
		
		/*mapNode2.put(discModelMost.getNode1(), mapD);
		mapNode2.put(discModelMost.getNode2(), mapI);
		mapNode2.put(discModelMost.getNode3(), mapS);
		mapNode2.put(discModelMost.getNode4(), mapC);*/
		   
		String first1 = mapNode.get(1);
		String second1 = mapNode.get(2);
		String third1= mapNode.get(3);
		String fourth1 = mapNode.get(4);
		
		String first = mapNode2.get(1);
		String second = mapNode2.get(2);
		String third = mapNode2.get(3);
		String fourth = mapNode2.get(4);
		
		String most = first+second+third+fourth;
		String least = first1+second1+third1+fourth1;
		//String most = mapNode2.get(sort2.get(0))+ mapNode2.get(sort2.get(1))+mapNode2.get(sort2.get(2))+mapNode2.get(sort2.get(3));
		//String most = mapNode2.get(sortarr2[0])+ mapNode2.get(sortarr2[1])+mapNode2.get(sortarr2[2])+mapNode2.get(sortarr2[3]);
		
//		discModelLeast.setCode(firstRow+secondRow+thirdRow+fourthRow);
//		discModelMost.setCode(firstRow2+secondRow2+thirdRow2+fourthRow2);
		discModelLeast.setCode(least);
		discModelMost.setCode(most);
		

		System.out.println(discModelLeast.getCode());
		System.out.println(discModelMost.getCode());
		
		discModelLeast.setTypeLetter(String.valueOf(first1.charAt(1)));
		discModelMost.setTypeLetter(String.valueOf(first.charAt(1)));
		
		discModelLeast.setType(SessionGetter.getPropertyKey("result.graph.type."+String.valueOf(first1.charAt(1))));
		discModelMost.setType(SessionGetter.getPropertyKey("result.graph.type."+String.valueOf(first.charAt(1))));
		String mostCode = codeTypeMap.get(discModelMost.getCode());
		String leastCode = codeTypeMap.get(discModelLeast.getCode());
		
		discModelLeast.setCodeDetail(codeTypeMap.get(discModelLeast.getCode())==null?null:codeTypeMap.get(discModelLeast.getCode()));
		discModelMost.setCodeDetail(codeTypeMap.get(discModelMost.getCode())==null?null:codeTypeMap.get(discModelMost.getCode()));
		
		System.out.println(mostCode);
		if(mostCode==null) {
			discModelMost.setNamaType(SessionGetter.getPropertyKey("result.graph.type.nograph"));
		}else {
			discModelMost.setNamaType(mostCode);
		}
		System.out.println(discModelMost.getType());
		System.out.println(leastCode);
		if(leastCode==null) {
			discModelLeast.setNamaType(SessionGetter.getPropertyKey("result.graph.type.nograph"));
		}else {
			discModelLeast.setNamaType(leastCode);
		}
		System.out.println(discModelLeast.getNamaType());
		/*namaTypeMost.setText(codeTypeMap.get(discModelMost.getCode()));
		namaTypeLeast.setText(codeTypeMap.get(discModelLeast.getCode()));*/
		
		SessionGetter.setResultDiscLeast(discModelLeast);
		SessionGetter.setResultDiscMost(discModelMost);
	}
	
	private void generate(DiscModel modelLeast, DiscModel modelMost) throws IOException {
		PDDocument doc = new PDDocument();
		InputStream fontStream = getClass()
				.getResourceAsStream("PT_Sans-Web-Regular.ttf");
		InputStream fontStreamBold = getClass()
				.getResourceAsStream("PT_Sans-Web-Bold.ttf");
		PDTrueTypeFont font = PDTrueTypeFont.loadTTF(doc, fontStream);
		PDTrueTypeFont fontBold = PDTrueTypeFont.loadTTF(doc, fontStreamBold);
		PDPage page = new PDPage(PDRectangle.A4);
		PDRectangle rect = page.getMediaBox();
		System.out.println(rect.getHeight());
		System.out.println(rect.getWidth());

		PDImageXObject pdimage;
		PDPageContentStream content;
		try {
			content = new PDPageContentStream(doc, page);

			service.generateHeaderPdf(content, doc);
			int secondHeaderY = 760;
			// DRAW LINE
			service.generateHeaderFillPdf(content, doc, fontBold,font, secondHeaderY);
			//
			content.beginText();
			content.setFont(fontBold, 18);
			content.setNonStrokingColor(Color.BLACK);
			//content.newLineAtOffset(Integer.valueOf(SessionGetter.getPropertyKey("range.title.range")), 808);
			if(SessionGetter.getBundle().getLocale().equals(new Locale("en"))) {
				content.newLineAtOffset(Integer.valueOf(SessionGetter.getPropertyKey("range.title.range"))+45, 808);
			}else {
				content.newLineAtOffset(Integer.valueOf(SessionGetter.getPropertyKey("range.title.range"))+36, 808);
			}
			content.showText(SessionGetter.getPropertyKey("result.file.header.title.disc"));
			content.endText();
			int rightTypeY = secondHeaderY - 120;
			content.beginText();
			content.setFont(font, 12);
			content.setNonStrokingColor(Color.BLACK);
			if(SessionGetter.getBundle().getLocale().equals(new Locale("en"))) {
				content.newLineAtOffset(400, rightTypeY);
			}else {
				content.newLineAtOffset(400, rightTypeY);
			}
			content.showText(SessionGetter.getPropertyKey("result.graph.highest.1.title"));
			content.endText();

			content.beginText();
			content.setNonStrokingColor(Color.BLACK);
			content.setFont(font, 12);
			content.newLineAtOffset(400, rightTypeY - 20);
			content.showText(SessionGetter.getPropertyKey("result.graph.adapted.title"));
			content.endText();

			int ySquare = rightTypeY - 60;
			content.addRect(400, rightTypeY - 60, 150, 30);
			content.setNonStrokingColor(Color.white);
			content.setStrokingColor(Color.lightGray);
			content.fillAndStroke();

			content.addRect(400, ySquare - 30, 150, 30);
			content.setNonStrokingColor(Color.white);
			content.setStrokingColor(Color.lightGray);
			content.fillAndStroke();

			int yTextSquare = rightTypeY - 50;
			content.beginText();
			content.setNonStrokingColor(Color.DARK_GRAY);
			content.setFont(fontBold, 12);
			content.newLineAtOffset(410, yTextSquare);
			content.showText(modelMost.getNamaType());
			content.endText();

			content.beginText();
			content.setNonStrokingColor(Color.DARK_GRAY);
			content.setFont(fontBold, 12);
			content.newLineAtOffset(410, yTextSquare - 30);
			content.showText(modelMost.getType());
			content.endText();

			int yLabel2 = rightTypeY - 120;
			content.beginText();
			content.setFont(font, 12);
			content.setNonStrokingColor(Color.BLACK);
			if(SessionGetter.getBundle().getLocale().equals(new Locale("en"))) {
				content.newLineAtOffset(400, yLabel2);
			}else {
				content.newLineAtOffset(400, yLabel2);
			}			content.showText(SessionGetter.getPropertyKey("result.graph.highest.2.title"));
			content.endText();

			content.beginText();
			content.setNonStrokingColor(Color.BLACK);
			content.setFont(font, 12);
			content.newLineAtOffset(400, yLabel2 - 20);
			content.showText(SessionGetter.getPropertyKey("result.graph.natural.title"));
			content.endText();

			// TYPE ON THE RIGHT SQUARE
			int ySquare2 = yLabel2 - 60;
			content.addRect(400, ySquare2, 150, 30);
			content.setNonStrokingColor(Color.white);
			content.setStrokingColor(Color.lightGray);
			content.fillAndStroke();

			content.addRect(400, ySquare2 - 30, 150, 30);
			content.setNonStrokingColor(Color.white);
			content.setStrokingColor(Color.lightGray);
			content.fillAndStroke();
			
			int yTextSquare2 = yLabel2 - 50;
			content.beginText();
			content.setNonStrokingColor(Color.DARK_GRAY);
			content.setFont(fontBold, 12);
			content.newLineAtOffset(410, yTextSquare2);
			content.showText(modelLeast.getNamaType());
			content.endText();

			content.beginText();
			content.setNonStrokingColor(Color.DARK_GRAY);
			content.setFont(fontBold, 12);
			content.newLineAtOffset(410, yTextSquare2 - 30);
			content.showText(modelLeast.getType());
			content.endText();
			Float rangeTitle = Float.valueOf(SessionGetter.getPropertyKey("range.title.graph.1"));
			Float rangeX = Float.valueOf(SessionGetter.getPropertyKey("range.title.graph.x"));
			Float rangeTitle2 = rangeX+10;
			// LINECHART
				String pathDoc = System.getProperty("user.home") + File.separator + "Documents" + File.separator + "Frexor PAS" + File.separator + "DISC" + File.separator;
				PDImageXObject pdImage = PDImageXObject.createFromFile(pathDoc+"chart.png", doc);
				content.drawImage(pdImage, 20, secondHeaderY - 330, 170, 250);
				PDImageXObject pdImage2 = PDImageXObject.createFromFile(pathDoc+"chart2.png", doc);
				File img;
				File img2;
				img = new File(pathDoc+"chart.png");
				if(img.exists()) {
					img.delete();
				}
				img2 = new File(pathDoc+"chart2.png");
				if(img2.exists()) {
					img2.delete();
				}
				content.drawImage(pdImage2, 210, secondHeaderY - 330, 170, 250);
				content.beginText();
				content.setNonStrokingColor(Color.BLACK);
				content.setFont(fontBold, 12);
				content.newLineAtOffset(rangeX, secondHeaderY - 65);
				content.showText(SessionGetter.getPropertyKey("result.graph.title.1"));
				content.endText();
				
				content.beginText();
				content.setNonStrokingColor(Color.BLACK);
				content.setFont(fontBold, 12);
				content.newLineAtOffset((rect.getWidth() / 2) - font.getStringWidth(SessionGetter.getPropertyKey("result.graph.title.1")) / rangeTitle * 12, secondHeaderY - 80);
				content.showText(SessionGetter.getPropertyKey("result.graph.sub.title.1"));
				content.endText();
				
				content.beginText();
				content.setNonStrokingColor(Color.BLACK);
				content.setFont(fontBold, 12);
				if(SessionGetter.getBundle().getLocale().equals(new Locale("en"))) {
					content.newLineAtOffset(190+rangeTitle2, secondHeaderY - 65);
				}else {
					content.newLineAtOffset(190+rangeTitle2, secondHeaderY - 65);
				}
				content.showText(SessionGetter.getPropertyKey("result.graph.title.2"));
				content.endText();
				
				content.beginText();
				content.setNonStrokingColor(Color.BLACK);
				content.setFont(fontBold, 12);
				content.newLineAtOffset((rect.getWidth() / 2) - font.getStringWidth(SessionGetter.getPropertyKey("result.graph.title.2")) / 6700.0f * 12, secondHeaderY - 80);
				content.showText(SessionGetter.getPropertyKey("result.graph.sub.title.2"));
				content.endText();
			// DETAIL PARAGRAPH
			int squareX = 20;
			int squareY = 360;
			int widthSquare = 250;
			int heightSquare = 45;
			int textInSquareX = squareX + 10;
			int textInSquareY = squareY + 30;

			// TITLE SQUARE
			content.addRect(squareX, squareY, widthSquare, heightSquare);
			content.setNonStrokingColor(Color.white);
			content.setStrokingColor(Color.lightGray);
			content.fillAndStroke();
			
			content.addRect(squareX + 305, squareY, widthSquare, heightSquare);
			content.setNonStrokingColor(Color.white);
			content.setStrokingColor(Color.lightGray);
			content.fillAndStroke();
			// MID LINE
			content.addRect(squareX + 280, textInSquareY - 370, 1, textInSquareY);
			content.setNonStrokingColor(Color.LIGHT_GRAY);
			content.fill();

			// CONTENT SQUARE
			content.beginText();
			content.setFont(font, 12);
			content.setNonStrokingColor(58, 90, 152);
			content.newLineAtOffset(textInSquareX, textInSquareY);
			content.showText(SessionGetter.getPropertyKey("result.graph.1"));
			content.endText();

			content.beginText();
			content.setFont(fontBold, 12);
			content.setNonStrokingColor(58, 90, 152);
			content.newLineAtOffset(textInSquareX + 45, textInSquareY);
			content.showText(modelMost.getNamaType());
			content.endText();

			content.beginText();
			content.setFont(font, 12);
			content.setNonStrokingColor(58, 90, 152);
			content.newLineAtOffset(textInSquareX, textInSquareY - 20);
			content.showText(SessionGetter.getPropertyKey("result.adapted.1"));
			content.endText();

			content.beginText();
			content.setFont(fontBold, 12);
			content.setNonStrokingColor(58, 90, 152);
			if(SessionGetter.getBundle().getLocale().equals(new Locale("en"))) {
				content.newLineAtOffset(textInSquareX + 103, textInSquareY - 20);
			}else {
				content.newLineAtOffset(textInSquareX + 95, textInSquareY - 20);
			}
			content.showText(modelMost.getType());
			content.endText();

			content.beginText();
			content.setFont(font, 12);
			content.setNonStrokingColor(58, 90, 152);
			content.newLineAtOffset(textInSquareX + 305, textInSquareY);
			content.showText(SessionGetter.getPropertyKey("result.graph.2"));
			content.endText();

			content.beginText();
			content.setFont(fontBold, 12);
			content.setNonStrokingColor(58, 90, 152);
			content.newLineAtOffset(textInSquareX + 350, textInSquareY);
			content.showText(modelLeast.getNamaType());
			content.endText();

			content.beginText();
			content.setFont(font, 12);
			content.setNonStrokingColor(58, 90, 152);
			content.newLineAtOffset(textInSquareX + 305, textInSquareY - 20);
			content.showText(SessionGetter.getPropertyKey("result.nature.1"));
			content.endText();

			content.beginText();
			content.setFont(fontBold, 12);
			content.setNonStrokingColor(58, 90, 152);
			if(SessionGetter.getBundle().getLocale().equals(new Locale("en"))) {
				content.newLineAtOffset(textInSquareX + 403, textInSquareY - 20);
			}else {
				content.newLineAtOffset(textInSquareX + 385, textInSquareY - 20);
			}
			content.showText(modelLeast.getType());
			content.endText();
			content.closeAndStroke();

			int paragraphX = squareX;
			int paragraphDetailY = squareY - 15;
			int tmpParagraphDetailY = paragraphDetailY;
			String bullet = "\u2022";
			String typeMost = modelMost.getNamaType().replace("#", "").replace(" ", "");
			System.out.println(typeMost);
			List<String> strengthDetaiList = new ArrayList<String>();
			int currDetail = paragraphDetailY - 15;
			String[] wrT = null;
			String s = null;
			
			if(modelMost.getCodeDetail()==null) {
				content.beginText();
				content.setFont(fontBold, 10);
				content.setNonStrokingColor(Color.BLACK);
				content.newLineAtOffset(paragraphX, paragraphDetailY);
				content.showText(SessionGetter.getPropertyKey("result.disc.detail.title.1")); 
				content.endText();
				strengthDetaiList.add(0, SessionGetter.getPropertyKey(modelMost.getTypeLetter() + ".keystrength.1"));
				strengthDetaiList.add(1,SessionGetter.getPropertyKey(modelMost.getTypeLetter() + ".keystrength.2"));
				strengthDetaiList.add(2,SessionGetter.getPropertyKey(modelMost.getTypeLetter() + ".keystrength.3"));
				strengthDetaiList.add(3,SessionGetter.getPropertyKey(modelMost.getTypeLetter() + ".keystrength.4"));
				for (int k = 0; k < strengthDetaiList.size(); k++) {
					wrT = WordUtils.wrap(strengthDetaiList.get(k), 60).split("\\r?\\n");
					content.beginText();
					content.setFont(font, 9);
					content.newLineAtOffset(paragraphX, currDetail);
					content.showText(bullet);
					content.endText();
					for (int i = 0; i < wrT.length; i++) {
						if(i==0) {
							currDetail = currDetail - i * 12;
						}else {
							currDetail = currDetail - 1 * 12;
						}
						if(i==0) {
							content.beginText();
							content.setFont(font, 9);
							content.newLineAtOffset(paragraphX, currDetail);
							content.showText(bullet);
							content.endText();
						}
						content.beginText();
						content.setFont(font, 9);
						content.newLineAtOffset(paragraphX+7, currDetail);
						s = wrT[i];
						content.showText(s);
						content.endText();
					}
					currDetail = currDetail - 12;
				}

				paragraphDetailY = currDetail - 8;

				content.beginText();
				content.setFont(fontBold, 10);
				content.setNonStrokingColor(Color.BLACK);
				content.newLineAtOffset(paragraphX, paragraphDetailY);
				content.showText(SessionGetter.getPropertyKey("result.disc.detail.title.2")); // bullet
				content.endText();

				currDetail = paragraphDetailY - 12;

				List<String> efectivenesDetailList = new ArrayList<String>();
				efectivenesDetailList.add(0,SessionGetter.getPropertyKey(modelMost.getTypeLetter() + ".improve.1"));
				efectivenesDetailList.add(1,SessionGetter.getPropertyKey(modelMost.getTypeLetter() + ".improve.2"));
				efectivenesDetailList.add(2,SessionGetter.getPropertyKey(modelMost.getTypeLetter() + ".improve.3"));
				efectivenesDetailList.add(3,SessionGetter.getPropertyKey(modelMost.getTypeLetter() + ".improve.4"));

				for (int k = 0; k < efectivenesDetailList.size(); k++) {
					wrT = WordUtils.wrap(efectivenesDetailList.get(k), 60).split("\\r?\\n");
					for (int i = 0; i < wrT.length; i++) {
						if(i==0) {
							currDetail = currDetail - i * 12;
						}else {
							currDetail = currDetail - 1 * 12;
						}
						if(i==0) {
							content.beginText();
							content.setFont(font, 9);
							content.newLineAtOffset(paragraphX, currDetail);
							content.showText(bullet);
							content.endText();
						}
						content.beginText();
						content.setFont(font, 9);
						content.newLineAtOffset(paragraphX+7, currDetail);
						s = wrT[i];
						content.showText(s);
						content.endText();
					}
					currDetail = currDetail - 12;
				}

				paragraphDetailY = currDetail - 8;

				content.beginText();
				content.setFont(fontBold, 10);
				content.setNonStrokingColor(Color.BLACK);
				content.newLineAtOffset(paragraphX, paragraphDetailY);
				content.showText(SessionGetter.getPropertyKey("result.disc.detail.title.3")); // bullet
				content.endText();

				currDetail = paragraphDetailY - 12;

				List<String> goalList = new ArrayList<String>();
				goalList.add(0,SessionGetter.getPropertyKey(modelMost.getTypeLetter() + ".ideal.1"));
				goalList.add(1,SessionGetter.getPropertyKey(modelMost.getTypeLetter() + ".ideal.2"));
				goalList.add(2,SessionGetter.getPropertyKey(modelMost.getTypeLetter() + ".ideal.3"));
				goalList.add(3,SessionGetter.getPropertyKey(modelMost.getTypeLetter() + ".ideal.4"));
				goalList.add(4,SessionGetter.getPropertyKey(modelMost.getTypeLetter() + ".ideal.5"));

				
				for (int k = 0; k < goalList.size(); k++) {
					wrT = WordUtils.wrap(goalList.get(k), 60).split("\\r?\\n");
					for (int i = 0; i < wrT.length; i++) {
						if(i==0) {
							currDetail = currDetail - i * 12;
						}else {
							currDetail = currDetail - 1 * 12;
						}
						if(i==0) {
							content.beginText();
							content.setFont(font, 9);
							content.newLineAtOffset(paragraphX, currDetail);
							content.showText(bullet);
							content.endText();
						}
						content.beginText();
						content.setFont(font, 9);
						content.newLineAtOffset(paragraphX+7, currDetail);
						s = wrT[i];
						content.showText(s);
						content.endText();
					}
					currDetail = currDetail - 12;
				}
			}else {
				// DETAIL DISC
				content.beginText();
				content.setFont(fontBold, 10);
				content.setNonStrokingColor(Color.BLACK);
				content.newLineAtOffset(paragraphX, paragraphDetailY);
				content.showText(SessionGetter.getPropertyKey("result.disc.keystrengths")); // bullet
				content.endText();
				System.out.println(modelMost.getCodeDetail());
				boolean isCodeMostNull = modelMost.getCodeDetail()==null;
				strengthDetaiList.add(0,SessionGetter.getPropertyKey(typeMost + ".keystrength.1"));
				strengthDetaiList.add(1,SessionGetter.getPropertyKey(typeMost + ".keystrength.2"));
				strengthDetaiList.add(2,SessionGetter.getPropertyKey(typeMost + ".keystrength.3"));
				strengthDetaiList.add(3,SessionGetter.getPropertyKey(typeMost + ".keystrength.4"));
				
				for (int k = 0; k < strengthDetaiList.size(); k++) {
					wrT = WordUtils.wrap(strengthDetaiList.get(k), 60).split("\\r?\\n");					
					
					for (int i = 0; i < wrT.length; i++) {
						if(i==0) {
							currDetail = currDetail - i * 12;
						}else {
							currDetail = currDetail - 1 * 12;
						}
						if(i==0) {
							content.beginText();
							content.setFont(font, 9);
							content.newLineAtOffset(paragraphX, currDetail);
							content.showText(bullet);
							content.endText();
						}
						content.beginText();
						content.setFont(font, 9);
						content.newLineAtOffset(paragraphX+7, currDetail);
						s = wrT[i];
						content.showText(s);
						content.endText();
					}
					currDetail = currDetail - 12;
				}

				paragraphDetailY = currDetail - 8;

				content.beginText();
				content.setFont(fontBold, 10);
				content.setNonStrokingColor(Color.BLACK);
				content.newLineAtOffset(paragraphX, paragraphDetailY);
				content.showText(SessionGetter.getPropertyKey("result.disc.improve")); // bullet
				content.endText();

				currDetail = paragraphDetailY - 12;

				List<String> efectivenesDetailList = new ArrayList<String>();
				efectivenesDetailList.add(0,SessionGetter.getPropertyKey(typeMost + ".improve.1"));
				efectivenesDetailList.add(1,SessionGetter.getPropertyKey(typeMost + ".improve.2"));
				efectivenesDetailList.add(2,SessionGetter.getPropertyKey(typeMost + ".improve.3"));
				for (int k = 0; k < efectivenesDetailList.size(); k++) {
					wrT = WordUtils.wrap(efectivenesDetailList.get(k), 60).split("\\r?\\n");
					for (int i = 0; i < wrT.length; i++) {
						if(i==0) {
							currDetail = currDetail - i * 12;
						}else {
							currDetail = currDetail - 1 * 12;
						}
						if(i==0) {
							content.beginText();
							content.setFont(font, 9);
							content.newLineAtOffset(paragraphX, currDetail);
							content.showText(bullet);
							content.endText();
						}
						content.beginText();
						content.setFont(font, 9);
						content.newLineAtOffset(paragraphX+7, currDetail);
						s = wrT[i];
						content.showText(s);
						content.endText();
					}
					currDetail = currDetail - 12;
				}

				paragraphDetailY = currDetail - 8;

				content.beginText();
				content.setFont(fontBold, 10);
				content.setNonStrokingColor(Color.BLACK);
				content.newLineAtOffset(paragraphX, paragraphDetailY);
				content.showText(SessionGetter.getPropertyKey("result.disc.tendencies")); // bullet
				content.endText();

				currDetail = paragraphDetailY - 12;

				List<String> goalList = new ArrayList<String>();
				goalList.add(0,SessionGetter.getPropertyKey(typeMost + ".tendencies.goal"));
				goalList.add(1,SessionGetter.getPropertyKey(typeMost + ".tendencies.judge"));
				goalList.add(2,SessionGetter.getPropertyKey(typeMost + ".tendencies.influence"));
				goalList.add(3,SessionGetter.getPropertyKey(typeMost + ".tendencies.valueorg"));
				goalList.add(4,SessionGetter.getPropertyKey(typeMost + ".tendencies.overuses"));
				goalList.add(5,SessionGetter.getPropertyKey(typeMost + ".tendencies.understress"));
				goalList.add(6,SessionGetter.getPropertyKey(typeMost + ".tendencies.fears"));

				for (int k = 0; k < goalList.size(); k++) {
					wrT = WordUtils.wrap(goalList.get(k), 60).split("\\r?\\n");
					for (int i = 0; i < wrT.length; i++) {
						if(i==0) {
							currDetail = currDetail - i * 12;
						}else {
							currDetail = currDetail - 1 * 12;
						}
						if(i==0) {
							content.beginText();
							content.setFont(font, 9);
							content.newLineAtOffset(paragraphX, currDetail);
							content.showText(bullet);
							content.endText();
						}
						content.beginText();
						content.setFont(font, 9);
						content.newLineAtOffset(paragraphX+7, currDetail);
						s = wrT[i];
						content.showText(s);
						content.endText();
					}
					currDetail = currDetail - 12;
				}
			
			}
			
			if(modelLeast.getCodeDetail()==null) {
				paragraphX = paragraphX + 305;
				paragraphDetailY = tmpParagraphDetailY;
					// RIGHT DETAIL
					content.beginText();
					content.setFont(fontBold, 10);
					content.setNonStrokingColor(Color.BLACK);
					content.newLineAtOffset(paragraphX, paragraphDetailY);
					content.showText(SessionGetter.getPropertyKey("result.disc.detail.title.1")); // bullet
					content.endText();
					String typeLeast = modelLeast.getNamaType().replace("#", "").replace(" ", "");
					int currDetail2 = paragraphDetailY - 15;

					String[] wrT2 = null;
					String s2 = null;
					List<String> strengthDetaiList2 = new ArrayList<String>();
					strengthDetaiList2.add(0,SessionGetter.getPropertyKey(modelLeast.getTypeLetter() + ".keystrength.1"));
					strengthDetaiList2.add(1,SessionGetter.getPropertyKey(modelLeast.getTypeLetter() + ".keystrength.2"));
					strengthDetaiList2.add(2,SessionGetter.getPropertyKey(modelLeast.getTypeLetter() + ".keystrength.3"));
					strengthDetaiList2.add(3,SessionGetter.getPropertyKey(modelLeast.getTypeLetter() + ".keystrength.4"));
					for (int k = 0; k < strengthDetaiList2.size(); k++) {
						wrT2 = WordUtils.wrap(strengthDetaiList2.get(k), 60).split("\\r?\\n");
						for (int i = 0; i < wrT2.length; i++) {
							if(i==0) {
								currDetail2 = currDetail2 - i * 12;
							}else {
								currDetail2 = currDetail2 - 1 * 12;
							}
							if(i==0) {
								content.beginText();
								content.setFont(font, 9);
								content.newLineAtOffset(paragraphX, currDetail2);
								content.showText(bullet);
								content.endText();
							}
							content.beginText();
							content.setFont(font, 9);
							content.newLineAtOffset(paragraphX+7, currDetail2);
							s2 = wrT2[i];
							content.showText(s2);
							content.endText();
						}
						currDetail2 = currDetail2 - 12;
					}

					paragraphDetailY = currDetail2 - 8;

					content.beginText();
					content.setFont(fontBold, 10);
					content.setNonStrokingColor(Color.BLACK);
					content.newLineAtOffset(paragraphX, paragraphDetailY);
					content.showText(SessionGetter.getPropertyKey("result.disc.detail.title.2")); // bullet
					content.endText();

					currDetail2 = paragraphDetailY - 12;

					List<String> efectivenesDetailList2 = new ArrayList<String>();
					efectivenesDetailList2.add(0,SessionGetter.getPropertyKey(modelLeast.getTypeLetter() + ".improve.1"));
					efectivenesDetailList2.add(1,SessionGetter.getPropertyKey(modelLeast.getTypeLetter() + ".improve.2"));
					efectivenesDetailList2.add(2,SessionGetter.getPropertyKey(modelLeast.getTypeLetter() + ".improve.3"));
					efectivenesDetailList2.add(3,SessionGetter.getPropertyKey(modelLeast.getTypeLetter() + ".improve.4"));
					for (int k = 0; k < efectivenesDetailList2.size(); k++) {
						wrT2 = WordUtils.wrap(efectivenesDetailList2.get(k), 60).split("\\r?\\n");
						for (int i = 0; i < wrT2.length; i++) {
							if(i==0) {
								currDetail2 = currDetail2 - i * 12;
							}else {
								currDetail2 = currDetail2 - 1 * 12;
							}
							if(i==0) {
								content.beginText();
								content.setFont(font, 9);
								content.newLineAtOffset(paragraphX, currDetail2);
								content.showText(bullet);
								content.endText();
							}
							content.beginText();
							content.setFont(font, 9);
							content.newLineAtOffset(paragraphX+7, currDetail2);
							s2 = wrT2[i];
							content.showText(s2);
							content.endText();
						}
						currDetail2 = currDetail2 - 12;
					}

					paragraphDetailY = currDetail2 - 8;

					content.beginText();
					content.setFont(fontBold, 10);
					content.setNonStrokingColor(Color.BLACK);
					content.newLineAtOffset(paragraphX, paragraphDetailY);
					content.showText(SessionGetter.getPropertyKey("result.disc.detail.title.3")); // bullet
					content.endText();

					currDetail2 = paragraphDetailY - 12;

					List<String> goalList2 = new ArrayList<String>();
					goalList2.add(0,SessionGetter.getPropertyKey(modelLeast.getTypeLetter() + ".ideal.1"));
					goalList2.add(1,SessionGetter.getPropertyKey(modelLeast.getTypeLetter() + ".ideal.2"));
					goalList2.add(2,SessionGetter.getPropertyKey(modelLeast.getTypeLetter() + ".ideal.3"));
					goalList2.add(3,SessionGetter.getPropertyKey(modelLeast.getTypeLetter() + ".ideal.4"));
					goalList2.add(4,SessionGetter.getPropertyKey(modelLeast.getTypeLetter() + ".ideal.5"));


					for (int k = 0; k < goalList2.size(); k++) {
						wrT2 = WordUtils.wrap(goalList2.get(k), 60).split("\\r?\\n");
						for (int i = 0; i < wrT2.length; i++) {
							if(i==0) {
								currDetail2 = currDetail2 - i * 12;
							}else {
								currDetail2 = currDetail2 - 1 * 12;
							}
							if(i==0) {
								content.beginText();
								content.setFont(font, 9);
								content.newLineAtOffset(paragraphX, currDetail2);
								content.showText(bullet);
								content.endText();
							}
							content.beginText();
							content.setFont(font, 9);
							content.newLineAtOffset(paragraphX+7, currDetail2);
							s2 = wrT2[i];
							content.showText(s2);
							content.endText();
						}
						currDetail2 = currDetail2 - 12;
					}
				
			}else {
				paragraphX = paragraphX + 300;
				paragraphDetailY = tmpParagraphDetailY;
					// RIGHT DETAIL
					content.beginText();
					content.setFont(fontBold, 10);
					content.setNonStrokingColor(Color.BLACK);
					content.newLineAtOffset(paragraphX, paragraphDetailY);
					content.showText(SessionGetter.getPropertyKey("result.disc.keystrengths")); // bullet
					content.endText();
					String typeLeast = modelLeast.getNamaType().replace("#", "").replace(" ", "");
					int currDetail2 = paragraphDetailY - 15;

					String[] wrT2 = null;
					String s2 = null;
					List<String> strengthDetaiList2 = new ArrayList<String>();
					strengthDetaiList2.add(0,SessionGetter.getPropertyKey(typeLeast + ".keystrength.1"));
					strengthDetaiList2.add(1,SessionGetter.getPropertyKey(typeLeast + ".keystrength.2"));
					strengthDetaiList2.add(2,SessionGetter.getPropertyKey(typeLeast + ".keystrength.3"));
					strengthDetaiList2.add(3,SessionGetter.getPropertyKey(typeLeast + ".keystrength.4"));
					for (int k = 0; k < strengthDetaiList2.size(); k++) {
						wrT2 = WordUtils.wrap(strengthDetaiList2.get(k), 60).split("\\r?\\n");
						for (int i = 0; i < wrT2.length; i++) {
							if(i==0) {
								currDetail2 = currDetail2 - i * 12;
							}else {
								currDetail2 = currDetail2 - 1 * 12;
							}
							if(i==0) {
								content.beginText();
								content.setFont(font, 9);
								content.newLineAtOffset(paragraphX, currDetail2);
								content.showText(bullet);
								content.endText();
							}
							content.beginText();
							content.setFont(font, 9);
							content.newLineAtOffset(paragraphX+7, currDetail2);
							s2 = wrT2[i];
							content.showText(s2);
							content.endText();
						}
						currDetail2 = currDetail2 - 12;
					}

					paragraphDetailY = currDetail2 - 8;

					content.beginText();
					content.setFont(fontBold, 10);
					content.setNonStrokingColor(Color.BLACK);
					content.newLineAtOffset(paragraphX, paragraphDetailY);
					content.showText(SessionGetter.getPropertyKey("result.disc.improve")); // bullet
					content.endText();

					currDetail2 = paragraphDetailY - 12;

					List<String> efectivenesDetailList2 = new ArrayList<String>();
					efectivenesDetailList2.add(0,SessionGetter.getPropertyKey(typeLeast + ".improve.1"));
					efectivenesDetailList2.add(1,SessionGetter.getPropertyKey(typeLeast + ".improve.2"));
					efectivenesDetailList2.add(2,SessionGetter.getPropertyKey(typeLeast + ".improve.3"));
					for (int k = 0; k < efectivenesDetailList2.size(); k++) {
						wrT2 = WordUtils.wrap(efectivenesDetailList2.get(k), 60).split("\\r?\\n");
						for (int i = 0; i < wrT2.length; i++) {
							if(i==0) {
								currDetail2 = currDetail2 - i * 12;
							}else {
								currDetail2 = currDetail2 - 1 * 12;
							}
							if(i==0) {
								content.beginText();
								content.setFont(font, 9);
								content.newLineAtOffset(paragraphX, currDetail2);
								content.showText(bullet);
								content.endText();
							}
							content.beginText();
							content.setFont(font, 9);
							content.newLineAtOffset(paragraphX+7, currDetail2);
							s2 = wrT2[i];
							content.showText(s2);
							content.endText();
						}
						currDetail2 = currDetail2 - 12;
					}

					paragraphDetailY = currDetail2 - 8;

					content.beginText();
					content.setFont(fontBold, 10);
					content.setNonStrokingColor(Color.BLACK);
					content.newLineAtOffset(paragraphX, paragraphDetailY);
					content.showText(SessionGetter.getPropertyKey("result.disc.tendencies")); // bullet
					content.endText();

					currDetail2 = paragraphDetailY - 12;

					List<String> goalList2 = new ArrayList<String>();
					goalList2.add(0,SessionGetter.getPropertyKey(typeLeast + ".tendencies.goal"));
					goalList2.add(1,SessionGetter.getPropertyKey(typeLeast + ".tendencies.judge"));
					goalList2.add(2,SessionGetter.getPropertyKey(typeLeast + ".tendencies.influence"));
					goalList2.add(3,SessionGetter.getPropertyKey(typeLeast + ".tendencies.valueorg"));
					goalList2.add(4,SessionGetter.getPropertyKey(typeLeast + ".tendencies.overuses"));
					goalList2.add(5,SessionGetter.getPropertyKey(typeLeast + ".tendencies.understress"));
					goalList2.add(6,SessionGetter.getPropertyKey(typeLeast + ".tendencies.fears"));

					for (int k = 0; k < goalList2.size(); k++) {
						wrT2 = WordUtils.wrap(goalList2.get(k), 60).split("\\r?\\n");
						for (int i = 0; i < wrT2.length; i++) {
							if(i==0) {
								currDetail2 = currDetail2 - i * 12;
							}else {
								currDetail2 = currDetail2 - 1 * 12;
							}
							if(i==0) {
								content.beginText();
								content.setFont(font, 9);
								content.newLineAtOffset(paragraphX, currDetail2);
								content.showText(bullet);
								content.endText();
							}
							content.beginText();
							content.setFont(font, 9);
							content.newLineAtOffset(paragraphX+7, currDetail2);
							s2 = wrT2[i];
							content.showText(s2);
							content.endText();
						}
						currDetail2 = currDetail2 - 12;
					}
				
			}
			
			
			service.generateFooterPdf(content, doc, font);
			content.close();
			doc.addPage(page);

			LocalDateTime ldt = LocalDateTime.now();
			String filename = SessionGetter.getPropertyKey("result.file.name") + " DISC " + SessionGetter.getDateFileName() + " " + SessionGetter.getPosition() + " " + SessionGetter.getName() + ".pdf";
			String path = System.getProperty("user.home") + File.separator + "Documents" + File.separator + "Frexor PAS" + File.separator + "DISC" + File.separator;
			File file = new File(path +filename);
			if (!file.exists()) {
				doc.save(path+filename);
				Desktop desktop = Desktop.getDesktop();
				desktop.open(file);
				 File tmp = new File(path +filename);
				 if(file.renameTo(tmp)){
				 desktop.open(file);	 
				 service.showAlertSave(path);
				 }
			}else {
				service.existAlert();
				service.saveAsDocument(doc, filename, "DISC");
			}
			//Check file is opened or not
			doc.close();
			
				
			
			//service.saveDocument(file, filename);
			

		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}
