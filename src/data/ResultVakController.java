package com.frexor.pas.controller;

import com.frexor.pas.Main;
import com.frexor.pas.model.VakModel;
import com.frexor.pas.utils.SessionGetter;
import com.frexor.pas.view.ScreenViewHandler;

import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.stage.Stage;

public class ResultVakController {
	Stage stage;
	Main main;
	ScreenViewHandler screenController = new ScreenViewHandler();
	VakModel model = new VakModel();
    String pref;
    @FXML
    Label labelPreferences;
    
    public ResultVakController() {
    	
    }
   
    @FXML
    public void initialize() {
    	labelPreferences.setText(SessionGetter.getResultVak().getPreference());
    }
    
    public VakModel getVak() {
    	return model;
    }
    
    public void setVak(VakModel model) {
    	this.model = model;
    } 
}
