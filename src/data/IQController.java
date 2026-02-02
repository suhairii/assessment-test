package com.frexor.pas.controller;

import java.awt.Desktop;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Locale;

import org.apache.pdfbox.io.IOUtils;

import com.frexor.pas.command.QuizCommand;
import com.frexor.pas.model.IQModel;
import com.frexor.pas.model.MenuModel;
import com.frexor.pas.service.FormulaResultService;
import com.frexor.pas.service.FormulaResultServiceImpl;
import com.frexor.pas.utils.PageGetter;
import com.frexor.pas.utils.SessionGetter;
import com.frexor.pas.view.ScreenViewHandler;

import javafx.fxml.FXML;
import javafx.scene.control.TextField;
import javafx.scene.layout.GridPane;
import javafx.util.StringConverter;

public class IQController extends QuizCommand {
	ScreenViewHandler screenController = new ScreenViewHandler();
	MenuModel model;
	PageGetter page = new PageGetter();
	FormulaResultService service = new FormulaResultServiceImpl();
	HashMap<String, TextField> mapField = new HashMap<String, TextField>();
	@FXML
	private GridPane grid;

	@FXML
	TextField field;

	@FXML
	TextField nextField;

	IQModel iq = new IQModel();

	public IQController() {
		iq.setTotalAnswer(30);
	}

	@FXML
	public void initialize() {
		if (grid != null) {
			Locale.setDefault(SessionGetter.getBundle().getLocale());
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("EEEE, dd MMMM yyyy",
					SessionGetter.getBundle().getLocale());
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
			formTitleIq.setText(SessionGetter.getPropertyKey("form.title.iq"));
			mapField = declare();

			btnSubmit.setText(SessionGetter.getPropertyKey("button.submit"));
		} else {
			labelPrint.setText(SessionGetter.getPropertyKey("form.penilaian.print"));
			labelGuide.setText(SessionGetter.getPropertyKey("form.penilaian.guide"));
			labelForm.setText(SessionGetter.getPropertyKey("form.penilaian.form"));
		}

		btnBack.setText(SessionGetter.getPropertyKey("button.back"));
	}

	@FXML
	public void handleSubmit() {
		SessionGetter.setName(nameField.getText());
		SessionGetter.setPosition(positionField.getText());
		SessionGetter.setDate(DateTimeFormatter.ofPattern("EEEE, dd MMMM yyyy", SessionGetter.getBundle().getLocale())
				.format(dateField.getValue()));
		SessionGetter.setDateFileName(DateTimeFormatter.ofPattern("yyyy-MM-dd", SessionGetter.getBundle().getLocale())
				.format(dateField.getValue()));
		HashMap<Integer, Integer> iqMap = declareIqResult();
		HashMap<Integer, String> iqAnswer = declareIqAnswerKey();
		System.out.println(name.getText());
		System.out.println(">>>>> NAME " + nameField.getText());

		if (nameField.getText().equalsIgnoreCase("") || positionField.getText().equalsIgnoreCase("")) {
			service.showAlertWarning();
		} else {
			IQModel resultIq = service.formulaIq(iqMap, mapField, iqAnswer);
			SessionGetter.setResultIq(resultIq);
		}

	}

	@FXML
	public void handleBackToMenu() {
		screenController.initPage(page.GETPAGE(11), "iq", SessionGetter.getStage());
	}

	@FXML
	public void handleTutorial() throws IOException {
		Desktop desktop = Desktop.getDesktop();
		InputStream is = getClass().getResourceAsStream(SessionGetter.getPropertyKey("guide.iq"));
		byte[] data = IOUtils.toByteArray(is);
		is.read(data);
		is.close();
		File temp = new File(
				System.getProperty("java.io.tmpdir") + File.separator + SessionGetter.getPropertyKey("guide.iq"));
		File t = new File(
				System.getProperty("java.io.tmpdir") + File.separator + SessionGetter.getPropertyKey("guide.iq"));
		if (temp.exists()) {
			if (temp.renameTo(t)) {
				FileOutputStream fos = new FileOutputStream(temp);
				fos.write(data);
				fos.flush();
				fos.close();
				desktop.open(temp);
			} else {
				service.showAlertOpenedDocument();
			}
		} else {
			FileOutputStream fos = new FileOutputStream(temp);
			fos.write(data);
			fos.flush();
			fos.close();
			desktop.open(temp);
		}

	}

	@FXML
	public void handleNext() {
		screenController.initPage(page.GETPAGE(5), "iq", SessionGetter.getStage());
	}

	@FXML
	public void handleBackToMainPage() {
		screenController.initPage(page.GETPAGE(3), "main", SessionGetter.getStage());
	}

	@FXML
	public void handleShowForm() throws IOException {
		Desktop desktop = Desktop.getDesktop();
		InputStream is = getClass().getResourceAsStream(SessionGetter.getPropertyKey("pdf.name.iq"));
		byte[] data = IOUtils.toByteArray(is);
		is.read(data);
		is.close();
		File temp = new File(
				System.getProperty("java.io.tmpdir") + File.separator + SessionGetter.getPropertyKey("pdf.name.iq"));
		File t = new File(
				System.getProperty("java.io.tmpdir") + File.separator + SessionGetter.getPropertyKey("pdf.name.iq"));
		if (temp.exists()) {
			if (temp.renameTo(t)) {
				FileOutputStream fos = new FileOutputStream(temp);
				fos.write(data);
				fos.flush();
				fos.close();
				desktop.open(temp);
			} else {
				service.showAlertOpenedDocument();
			}
		} else {
			FileOutputStream fos = new FileOutputStream(temp);
			fos.write(data);
			fos.flush();
			fos.close();
			desktop.open(temp);
		}

	}

	@FXML
	public void handleAction() {
		textField1.setText(textField1.getText());
		System.out.println(textField1);
	}

	public void setField(TextField field) {
		this.field = field;
	}

}
