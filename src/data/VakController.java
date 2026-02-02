package com.frexor.pas.controller;

import java.awt.Desktop;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.HashMap;
import java.util.Locale;

import org.apache.pdfbox.io.IOUtils;

import com.frexor.pas.Main;
import com.frexor.pas.command.QuizCommand;
import com.frexor.pas.model.MenuModel;
import com.frexor.pas.model.VakModel;
import com.frexor.pas.service.FormulaResultService;
import com.frexor.pas.service.FormulaResultServiceImpl;
import com.frexor.pas.utils.PageGetter;
import com.frexor.pas.utils.SessionGetter;
import com.frexor.pas.view.ScreenViewHandler;

import javafx.event.EventHandler;
import javafx.fxml.FXML;
import javafx.scene.control.Alert;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.control.Alert.AlertType;
import javafx.scene.input.KeyEvent;
import javafx.scene.layout.GridPane;
import javafx.stage.Stage;
import javafx.util.StringConverter;

public class VakController extends QuizCommand {
	Stage stage;
	Main main;
	ScreenViewHandler screenController = new ScreenViewHandler();
	MenuModel model;
	PageGetter page = new PageGetter();
	FormulaResultService service = new FormulaResultServiceImpl();
	HashMap<String, TextField> mapField = new HashMap<String, TextField>();
	Integer next = 1;
	@FXML
	private GridPane grid;

	@FXML
	TextField field;

	@FXML
	TextField nextField;

	VakModel vak = new VakModel();

	public VakController() {
		vak.setTotalAnswer(30);

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
			formTitleVak.setText(SessionGetter.getPropertyKey("form.title.vak"));
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
	public void handleNext() {
		screenController.initPage(page.GETPAGE(6), "vak", SessionGetter.getStage());
//		btnSubmit.setText(SessionGetter.getPropertyKey("button.submit"));
	}

	@FXML
	public void handleBackToMainPage() {
		screenController.initPage(page.GETPAGE(3), "main", SessionGetter.getStage());
	}

	@FXML
	public void handleTutorial() throws IOException {
		Desktop desktop = Desktop.getDesktop();
		InputStream is = getClass().getResourceAsStream(SessionGetter.getPropertyKey("guide.vak"));
		byte[] data = IOUtils.toByteArray(is);
		is.read(data);
		is.close();
		File temp = new File(
				System.getProperty("java.io.tmpdir") + File.separator + SessionGetter.getPropertyKey("guide.vak"));
		File t = new File(
				System.getProperty("java.io.tmpdir") + File.separator + SessionGetter.getPropertyKey("guide.vak"));
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
	public void handleSubmit() throws IOException {
		SessionGetter.setName(nameField.getText());
		SessionGetter.setPosition(positionField.getText());
		SessionGetter.setDate(DateTimeFormatter.ofPattern("EEEE, dd MMMM yyyy", SessionGetter.getBundle().getLocale())
				.format(dateField.getValue()));
		SessionGetter.setDateFileName(DateTimeFormatter.ofPattern("yyyy-MM-dd", SessionGetter.getBundle().getLocale())
				.format(dateField.getValue()));
		VakModel resultVak = service.formulaVak(mapField, vak);
		SessionGetter.setResultVak(resultVak);
		/*
		 * screenController.initPage(page.GETPAGE(7), "vak", SessionGetter.getStage());
		 */
		if (nameField.getText().equalsIgnoreCase("") || positionField.getText().equalsIgnoreCase("")) {
			service.showAlertWarning();
		} else {
			service.generatevak(resultVak);
		}

	}

	@FXML
	public void handleShowForm() throws IOException {
		Desktop desktop = Desktop.getDesktop();
		InputStream is = getClass().getResourceAsStream(SessionGetter.getPropertyKey("pdf.name.vak"));
		byte[] data = IOUtils.toByteArray(is);
		is.read(data);
		is.close();
		File temp = new File(
				System.getProperty("java.io.tmpdir") + File.separator + SessionGetter.getPropertyKey("pdf.name.vak"));
		File t = new File(
				System.getProperty("java.io.tmpdir") + File.separator + SessionGetter.getPropertyKey("pdf.name.vak"));
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
	}

	@FXML
	public void handleBackToMenu() {
		screenController.initPage(page.GETPAGE(12), "vak", SessionGetter.getStage());

	}

	public void setStage(Stage stage) {
		this.stage = stage;
	}

	public void setField(TextField field) {
		this.field = field;
	}

}
