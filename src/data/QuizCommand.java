package com.frexor.pas.command;

import java.util.HashMap;

import com.frexor.pas.service.FormulaResultService;
import com.frexor.pas.service.FormulaResultServiceImpl;

import javafx.beans.value.ChangeListener;
import javafx.beans.value.ObservableValue;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.DatePicker;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;

public class QuizCommand {
	FormulaResultService service = new FormulaResultServiceImpl();
	HashMap<String, TextField> mapField = new HashMap<String, TextField>();
	HashMap<Integer, Integer> iqMap = new HashMap<Integer, Integer>();
	HashMap<Integer, String> iqAnswerKey = new HashMap<Integer, String>();
	HashMap<Integer, String> discAnswerKeyMost = new HashMap<Integer, String>();
	HashMap<Integer, String> discAnswerKeyLeast = new HashMap<Integer, String>();
	HashMap<String, String> codeTypeMap = new HashMap<String, String>();

	public HashMap<Integer, Integer> konversiDMost = new HashMap<Integer, Integer>();
	public HashMap<Integer, Integer> konversiIMost = new HashMap<Integer, Integer>();
	public HashMap<Integer, Integer> konversiSMost = new HashMap<Integer, Integer>();
	public HashMap<Integer, Integer> konversiCMost = new HashMap<Integer, Integer>();

	public HashMap<Integer, Integer> konversiDLeast = new HashMap<Integer, Integer>();
	public HashMap<Integer, Integer> konversiILeast = new HashMap<Integer, Integer>();
	public HashMap<Integer, Integer> konversiSLeast = new HashMap<Integer, Integer>();
	public HashMap<Integer, Integer> konversiCLeast = new HashMap<Integer, Integer>();
	@FXML
	public Button backButton;
	@FXML
	public TextField textField1;
	@FXML
	public TextField textField2;
	@FXML
	public TextField textField3;
	@FXML
	public TextField textField4;
	@FXML
	public TextField textField5;
	@FXML
	public TextField textField6;
	@FXML
	public TextField textField7;
	@FXML
	public TextField textField8;
	@FXML
	public TextField textField9;
	@FXML
	public TextField textField10;
	@FXML
	public TextField textField11;
	@FXML
	public TextField textField12;
	@FXML
	public TextField textField13;
	@FXML
	public TextField textField14;
	@FXML
	public TextField textField15;
	@FXML
	public TextField textField16;
	@FXML
	public TextField textField17;
	@FXML
	public TextField textField18;
	@FXML
	public TextField textField19;
	@FXML
	public TextField textField20;

	@FXML
	public TextField textField21;
	@FXML
	public TextField textField22;
	@FXML
	public TextField textField23;
	@FXML
	public TextField textField24;
	@FXML
	public TextField textField25;
	@FXML
	public TextField textField26;
	@FXML
	public TextField textField27;
	@FXML
	public TextField textField28;
	@FXML
	public TextField textField29;
	@FXML
	public TextField textField30;
	@FXML
	public TextField textField31;
	@FXML
	public TextField textField32;
	@FXML
	public TextField textField33;
	@FXML
	public TextField textField34;
	@FXML
	public TextField textField35;
	@FXML
	public TextField textField36;
	@FXML
	public TextField textField37;
	@FXML
	public TextField textField38;
	@FXML
	public TextField textField39;
	@FXML
	public TextField textField40;

	@FXML
	public TextField textField41;
	@FXML
	public TextField textField42;
	@FXML
	public TextField textField43;
	@FXML
	public TextField textField44;
	@FXML
	public TextField textField45;
	@FXML
	public TextField textField46;
	@FXML
	public TextField textField47;
	@FXML
	public TextField textField48;
	@FXML
	public TextField textField49;
	@FXML
	public TextField textField50;
	@FXML
	public TextField textField51;
	@FXML
	public TextField textField52;
	@FXML
	public TextField textField53;
	@FXML
	public TextField textField54;
	@FXML
	public TextField textField55;
	@FXML
	public TextField textField56;
	@FXML
	public TextField textField57;
	@FXML
	public TextField textField58;
	@FXML
	public TextField textField59;
	@FXML
	public TextField textField60;

	@FXML
	public Label name;
	@FXML
	public Label position;
	@FXML
	public Label date;
	@FXML
	public Label formMessage;
	@FXML
	public Label formTitleDisc;
	@FXML
	public Label formTitleVak;
	@FXML
	public Label formTitleIq;

	@FXML
	public Label labelPrint;
	@FXML
	public Label labelGuide;
	@FXML
	public Label labelForm;

	@FXML
	public Button btnBack;
	@FXML
	public Button btnSubmit;

	@FXML
	public TextField nameField;

	@FXML
	public TextField positionField;

	@FXML
	public DatePicker dateField;

	public QuizCommand() {

	}

	public HashMap<String, TextField> declare() {
		mapField.put("txt1", textField1);
		mapField.put("txt2", textField2);
		mapField.put("txt3", textField3);
		mapField.put("txt4", textField4);
		mapField.put("txt5", textField5);
		mapField.put("txt6", textField6);
		mapField.put("txt7", textField7);
		mapField.put("txt8", textField8);
		mapField.put("txt9", textField9);
		mapField.put("txt10", textField10);
		mapField.put("txt11", textField11);
		mapField.put("txt12", textField12);
		mapField.put("txt13", textField13);
		mapField.put("txt14", textField14);
		mapField.put("txt15", textField15);
		mapField.put("txt16", textField16);
		mapField.put("txt17", textField17);
		mapField.put("txt18", textField18);
		mapField.put("txt19", textField19);
		mapField.put("txt20", textField20);
		mapField.put("txt21", textField21);
		mapField.put("txt22", textField22);
		mapField.put("txt23", textField23);
		mapField.put("txt24", textField24);
		mapField.put("txt25", textField25);
		mapField.put("txt26", textField26);
		mapField.put("txt27", textField27);
		mapField.put("txt28", textField28);
		mapField.put("txt29", textField29);
		mapField.put("txt30", textField30);
		mapField.put("txt31", textField31);
		mapField.put("txt32", textField32);
		mapField.put("txt33", textField33);
		mapField.put("txt34", textField34);
		mapField.put("txt35", textField35);
		mapField.put("txt36", textField36);
		mapField.put("txt37", textField37);
		mapField.put("txt38", textField38);
		mapField.put("txt39", textField39);
		mapField.put("txt40", textField40);
		mapField.put("txt41", textField41);
		mapField.put("txt42", textField42);
		mapField.put("txt43", textField43);
		mapField.put("txt44", textField44);
		mapField.put("txt45", textField45);
		mapField.put("txt46", textField46);
		mapField.put("txt47", textField47);
		mapField.put("txt48", textField48);
		mapField.put("txt49", textField49);
		mapField.put("txt50", textField50);
		mapField.put("txt51", textField51);
		mapField.put("txt52", textField52);
		mapField.put("txt53", textField53);
		mapField.put("txt54", textField54);
		mapField.put("txt55", textField55);
		mapField.put("txt56", textField56);
		mapField.put("txt57", textField57);
		mapField.put("txt58", textField58);
		mapField.put("txt59", textField59);
		mapField.put("txt60", textField60);
		return mapField;
	}

	public HashMap<Integer, Integer> declareIqResult() {
		iqMap.put(22, 80);
		iqMap.put(23, 82);
		iqMap.put(24, 84);
		iqMap.put(25, 86);
		iqMap.put(26, 88);
		iqMap.put(27, 90);
		iqMap.put(28, 92);
		iqMap.put(29, 94);
		iqMap.put(30, 96);
		iqMap.put(31, 98);
		iqMap.put(32, 100);
		iqMap.put(33, 102);
		iqMap.put(34, 104);
		iqMap.put(35, 106);
		iqMap.put(36, 108);
		iqMap.put(37, 110);
		iqMap.put(38, 112);
		iqMap.put(39, 114);
		iqMap.put(40, 116);
		iqMap.put(41, 118);
		iqMap.put(42, 120);
		iqMap.put(43, 122);
		iqMap.put(44, 124);
		iqMap.put(45, 126);
		iqMap.put(46, 128);
		iqMap.put(47, 130);
		iqMap.put(48, 132);
		iqMap.put(49, 134);
		iqMap.put(50, 136);
		iqMap.put(51, 138);
		iqMap.put(52, 140);
		iqMap.put(53, 142);
		iqMap.put(54, 146);
		iqMap.put(55, 150);
		iqMap.put(56, 155);
		iqMap.put(57, 160);
		iqMap.put(58, 165);
		iqMap.put(59, 165);
		iqMap.put(60, 165);
		return iqMap;
	}

	public HashMap<Integer, String> declareIqAnswerKey() {
		iqAnswerKey.put(1, "B");
		iqAnswerKey.put(2, "E");
		iqAnswerKey.put(3, "D");
		iqAnswerKey.put(4, "C");
		iqAnswerKey.put(5, "B");
		iqAnswerKey.put(6, "B");
		iqAnswerKey.put(7, "E");
		iqAnswerKey.put(8, "E");
		iqAnswerKey.put(9, "C");
		iqAnswerKey.put(10, "E");

		iqAnswerKey.put(11, "C");
		iqAnswerKey.put(12, "B");
		iqAnswerKey.put(13, "D");
		iqAnswerKey.put(14, "E");
		iqAnswerKey.put(15, "H");
		iqAnswerKey.put(16, "D");
		iqAnswerKey.put(17, "B");
		iqAnswerKey.put(18, "D");
		iqAnswerKey.put(19, "D");
		iqAnswerKey.put(20, "D");

		iqAnswerKey.put(21, "D");
		iqAnswerKey.put(22, "B");
		iqAnswerKey.put(23, "C");
		iqAnswerKey.put(24, "B");
		iqAnswerKey.put(25, "B");
		iqAnswerKey.put(26, "B");
		iqAnswerKey.put(27, "D");
		iqAnswerKey.put(28, "C");
		iqAnswerKey.put(29, "C");
		iqAnswerKey.put(30, "E");

		iqAnswerKey.put(31, "D");
		iqAnswerKey.put(32, "C");
		iqAnswerKey.put(33, "B");
		iqAnswerKey.put(34, "C");
		iqAnswerKey.put(35, "B");
		iqAnswerKey.put(36, "D");
		iqAnswerKey.put(37, "B");
		iqAnswerKey.put(38, "D");
		iqAnswerKey.put(39, "D");
		iqAnswerKey.put(40, "C");

		iqAnswerKey.put(41, "D");
		iqAnswerKey.put(42, "B");
		iqAnswerKey.put(43, "E");
		iqAnswerKey.put(44, "A");
		iqAnswerKey.put(45, "B");
		iqAnswerKey.put(46, "D");
		iqAnswerKey.put(47, "D");
		iqAnswerKey.put(48, "C");
		iqAnswerKey.put(49, "E");
		iqAnswerKey.put(50, "B");

		iqAnswerKey.put(51, "C");
		iqAnswerKey.put(52, "B");
		iqAnswerKey.put(53, "B");
		iqAnswerKey.put(54, "H");
		iqAnswerKey.put(55, "C");
		iqAnswerKey.put(56, "A");
		iqAnswerKey.put(57, "E");
		iqAnswerKey.put(58, "C");
		iqAnswerKey.put(59, "C");
		iqAnswerKey.put(60, "D");
		return iqAnswerKey;
	}

	public HashMap<Integer, String> defineDiscAnswerMost() {
		discAnswerKeyMost.put(1, "SICX");
		discAnswerKeyMost.put(2, "ICDX");
		discAnswerKeyMost.put(3, "XDSI");
		discAnswerKeyMost.put(4, "CSXI");
		discAnswerKeyMost.put(5, "XCXS");
		discAnswerKeyMost.put(6, "DSXX");
		discAnswerKeyMost.put(7, "XSDI");
		discAnswerKeyMost.put(8, "DIXX");
		discAnswerKeyMost.put(9, "ISDC");
		discAnswerKeyMost.put(10, "DCXS");
		discAnswerKeyMost.put(11, "ISXD");
		discAnswerKeyMost.put(12, "XDCS");
		discAnswerKeyMost.put(13, "DISX");
		discAnswerKeyMost.put(14, "CDIS");
		discAnswerKeyMost.put(15, "SXCX");
		discAnswerKeyMost.put(16, "IXXD");
		discAnswerKeyMost.put(17, "CSXD");
		discAnswerKeyMost.put(18, "ISXD");
		discAnswerKeyMost.put(19, "CDIS");
		discAnswerKeyMost.put(20, "DCXI");
		discAnswerKeyMost.put(21, "SXDC");
		discAnswerKeyMost.put(22, "IXDS");
		discAnswerKeyMost.put(23, "ICDX");
		discAnswerKeyMost.put(24, "DSIC");
		return discAnswerKeyMost;
	}

	public HashMap<Integer, String> defineDiscAnswerLeast() {
		discAnswerKeyLeast.put(1, "SXCD");
		discAnswerKeyLeast.put(2, "ICDS");
		discAnswerKeyLeast.put(3, "CDXI");
		discAnswerKeyLeast.put(4, "XSDI");
		discAnswerKeyLeast.put(5, "ICDS");
		discAnswerKeyLeast.put(6, "DSIC");
		discAnswerKeyLeast.put(7, "CXDI");
		discAnswerKeyLeast.put(8, "XXSC");
		discAnswerKeyLeast.put(9, "ISDX");
		discAnswerKeyLeast.put(10, "DXIS");
		discAnswerKeyLeast.put(11, "ISCD");
		discAnswerKeyLeast.put(12, "IDXS");
		discAnswerKeyLeast.put(13, "XISC");
		discAnswerKeyLeast.put(14, "CXIX");
		discAnswerKeyLeast.put(15, "XICD");
		discAnswerKeyLeast.put(16, "XSCD");
		discAnswerKeyLeast.put(17, "XSID");
		discAnswerKeyLeast.put(18, "XXCD");
		discAnswerKeyLeast.put(19, "XDIS");
		discAnswerKeyLeast.put(20, "DXSI");
		discAnswerKeyLeast.put(21, "ISDC");
		discAnswerKeyLeast.put(22, "ICDS");
		discAnswerKeyLeast.put(23, "IXDS");
		discAnswerKeyLeast.put(24, "DSIC");
		return discAnswerKeyLeast;
	}

	public void konversiDiscMostDict() {
		konversiDMost.put(20, 100);
		konversiDMost.put(19, 100);
		konversiDMost.put(18, 99);
		konversiDMost.put(17, 98);
		konversiDMost.put(16, 97);
		konversiDMost.put(15, 93);
		konversiDMost.put(14, 95);
		konversiDMost.put(13, 83);
		konversiDMost.put(12, 79);
		konversiDMost.put(11, 76);
		konversiDMost.put(10, 73);
		konversiDMost.put(9, 65);
		konversiDMost.put(8, 59);
		konversiDMost.put(7, 53);
		konversiDMost.put(6, 48);
		konversiDMost.put(5, 43);
		konversiDMost.put(4, 38);
		konversiDMost.put(3, 33);
		konversiDMost.put(2, 24);
		konversiDMost.put(1, 15);
		konversiDMost.put(0, 3);
		
		konversiIMost.put(19, 100);
		konversiIMost.put(18, 100);
		konversiIMost.put(17, 100);
		konversiIMost.put(16, 100);
		konversiIMost.put(15, 100);
		konversiIMost.put(14, 100);
		konversiIMost.put(13, 100);
		konversiIMost.put(12, 100);
		konversiIMost.put(11, 100);
		konversiIMost.put(10, 97);
		konversiIMost.put(9, 92);
		konversiIMost.put(8, 88);
		konversiIMost.put(7, 83);
		konversiIMost.put(6, 73);
		konversiIMost.put(5, 68);
		konversiIMost.put(4, 56);
		konversiIMost.put(3, 43);
		konversiIMost.put(2, 35);
		konversiIMost.put(1, 20);
		konversiIMost.put(0, 8);

		konversiSMost.put(19, 100);
		konversiSMost.put(18, 100);
		konversiSMost.put(17, 100);
		konversiSMost.put(16, 100);
		konversiSMost.put(15, 100);
		konversiSMost.put(14, 100);
		konversiSMost.put(13, 100);
		konversiSMost.put(12, 97);
		konversiSMost.put(11, 89);
		konversiSMost.put(10, 85);
		konversiSMost.put(9, 78);
		konversiSMost.put(8, 74);
		konversiSMost.put(7, 67);
		konversiSMost.put(6, 61);
		konversiSMost.put(5, 55);
		konversiSMost.put(4, 45);
		konversiSMost.put(3, 38);
		konversiSMost.put(2, 30);
		konversiSMost.put(1, 22);
		konversiSMost.put(0, 11);

		konversiCMost.put(15, 100);
		konversiCMost.put(14, 100);
		konversiCMost.put(13, 100);
		konversiCMost.put(12, 100);
		konversiCMost.put(11, 100);
		konversiCMost.put(10, 100);
		konversiCMost.put(9, 96);
		konversiCMost.put(8, 89);
		konversiCMost.put(7, 84);
		konversiCMost.put(6, 73);
		konversiCMost.put(5, 66);
		konversiCMost.put(4, 54);
		konversiCMost.put(3, 40);
		konversiCMost.put(2, 29);
		konversiCMost.put(1, 16);
		konversiCMost.put(0, 0);

	}

	public void konversiDiscLeastDict() {
		konversiDLeast.put(21, 1);
		konversiDLeast.put(20, 1);
		konversiDLeast.put(19, 2);
		konversiDLeast.put(18, 3);
		konversiDLeast.put(17, 4);
		konversiDLeast.put(16, 5);
		konversiDLeast.put(15, 8);
		konversiDLeast.put(14, 11);
		konversiDLeast.put(13, 15);
		konversiDLeast.put(12, 21);
		konversiDLeast.put(11, 25);
		konversiDLeast.put(10, 28);
		konversiDLeast.put(9, 31);
		konversiDLeast.put(8, 38);
		konversiDLeast.put(7, 42);
		konversiDLeast.put(6, 48);
		konversiDLeast.put(5, 53);
		konversiDLeast.put(4, 59);
		konversiDLeast.put(3, 67);
		konversiDLeast.put(2, 75);
		konversiDLeast.put(1, 87);
		konversiDLeast.put(0, 100);

		konversiILeast.put(19, 0);
		konversiILeast.put(18, 1);
		konversiILeast.put(17, 1);
		konversiILeast.put(16, 2);
		konversiILeast.put(15, 3);
		konversiILeast.put(14, 4);
		konversiILeast.put(13, 5);
		konversiILeast.put(12, 6);
		konversiILeast.put(11, 7);
		konversiILeast.put(10, 10);
		konversiILeast.put(9, 15);
		konversiILeast.put(8, 22);
		konversiILeast.put(7, 28);
		konversiILeast.put(6, 37);
		konversiILeast.put(5, 46);
		konversiILeast.put(4, 55);
		konversiILeast.put(3, 67);
		konversiILeast.put(2, 75);
		konversiILeast.put(1, 86);
		konversiILeast.put(0, 100);

		konversiSLeast.put(19, 1);
		konversiSLeast.put(18, 1);
		konversiSLeast.put(17, 1);
		konversiSLeast.put(16, 1);
		konversiSLeast.put(15, 2);
		konversiSLeast.put(14, 3);
		konversiSLeast.put(13, 4);
		konversiSLeast.put(12, 8);
		konversiSLeast.put(11, 15);
		konversiSLeast.put(10, 23);
		konversiSLeast.put(9, 29);
		konversiSLeast.put(8, 37);
		konversiSLeast.put(7, 42);
		konversiSLeast.put(6, 53);
		konversiSLeast.put(5, 59);
		konversiSLeast.put(4, 67);
		konversiSLeast.put(3, 75);
		konversiSLeast.put(2, 85);
		konversiSLeast.put(1, 96);
		konversiSLeast.put(0, 100);

		konversiCLeast.put(16, 0);
		konversiCLeast.put(15, 1);
		konversiCLeast.put(14, 2);
		konversiCLeast.put(13, 3);
		konversiCLeast.put(12, 7);
		konversiCLeast.put(11, 14);
		konversiCLeast.put(10, 23);
		konversiCLeast.put(9, 33);
		konversiCLeast.put(8, 39);
		konversiCLeast.put(7, 47);
		konversiCLeast.put(6, 52);
		konversiCLeast.put(5, 58);
		konversiCLeast.put(4, 65);
		konversiCLeast.put(3, 74);
		konversiCLeast.put(2, 82);
		konversiCLeast.put(1, 95);
		konversiCLeast.put(0, 100);

	}

	public HashMap<String, String> getTypeDisc() {
		codeTypeMap.put("HCLDLILS", "Analyzer #7");
		codeTypeMap.put("HCLILDLS", "Analyzer #7");
		codeTypeMap.put("HCHSLDLI", "Coordinator #21");
		codeTypeMap.put("HCHSLILD", "Coordinator #21");
		codeTypeMap.put("HCHDLILS", "Implementor #24");
		codeTypeMap.put("HCHDLSLI", "Implementor #24");
		codeTypeMap.put("HCHILSLD", "Analyzer #60");
		codeTypeMap.put("HCHILDLS", "Analyzer #60");
		codeTypeMap.put("HCHIHDLS", "Analyzer #55");
		codeTypeMap.put("HCHDHILS", "Analyzer #55");
		codeTypeMap.put("HCHSHDLI", "Analyzer #38");
		codeTypeMap.put("HCHDHSLI", "Analyzer #38");
		codeTypeMap.put("HDLILCLS", "Conductor #1");
		codeTypeMap.put("HDLILCLS", "Conductor #1");
		codeTypeMap.put("HDHILSLC", "Persuader #12");
		codeTypeMap.put("HDHILCLS", "Persuader #12");
		codeTypeMap.put("HDHCLILS", "Implementor #9");
		codeTypeMap.put("HDHCLSLI", "Implementor #9");
		codeTypeMap.put("HDHSLILC", "Conductor #57");
		codeTypeMap.put("HDHSLCLI", "Conductor #57");
		codeTypeMap.put("HDHIHCLS", "Conductor #27");
		codeTypeMap.put("HDHCHILS", "Conductor #27");
		codeTypeMap.put("HDHSHCLI", "Conductor #42");
		codeTypeMap.put("HDHCHSLI", "Conductor #42");
		codeTypeMap.put("HSLDLCLI", "Supporter #5");
		codeTypeMap.put("HSLDLILC", "Supporter #5");
		codeTypeMap.put("HSLCLDLI", "Supporter #5");
		codeTypeMap.put("HSLCLILD", "Supporter #5");
		codeTypeMap.put("HSLILDLC", "Supporter #5");
		codeTypeMap.put("HSLILCLD", "Supporter #5");
		codeTypeMap.put("HSHCLDLI", "Coordinator #20");
		codeTypeMap.put("HSHCLILD", "Coordinator #20");
		codeTypeMap.put("HSHILDLC", "Relater #17");
		codeTypeMap.put("HSHILCLD", "Relater #17");
		codeTypeMap.put("HSHDLILC", "Supporter #59");
		codeTypeMap.put("HSHDLCLI", "Supporter #59");
		codeTypeMap.put("HSHIHCLD", "Supporter #35");
		codeTypeMap.put("HSHCHILD", "Supporter #35");
		codeTypeMap.put("HSHDHILC", "Supporter #50");
		codeTypeMap.put("HSHIHDLC", "Supporter #50");
		codeTypeMap.put("HILDLCLS", "Promoter #3");
		codeTypeMap.put("HILDLSLC", "Promoter #3");
		codeTypeMap.put("HILCLDLS", "Promoter #3");
		codeTypeMap.put("HILCLSLD", "Promoter #3");
		codeTypeMap.put("HILSLDLC", "Promoter #3");
		codeTypeMap.put("HILSLCLD", "Promoter #3");
		codeTypeMap.put("HIHDLSLC", "Persuader #13");
		codeTypeMap.put("HIHDLCLS", "Persuader #13");
		codeTypeMap.put("HIHSLDLC", "Relater #16");
		codeTypeMap.put("HIHSLCLD", "Relater #16");
		codeTypeMap.put("HIHCLDLS", "Promoter #58");
		codeTypeMap.put("HIHCLSLD", "Promoter #58");
		codeTypeMap.put("HIHSHCLD", "Promoter #47");
		codeTypeMap.put("HIHCHSLD", "Promoter #47");
		codeTypeMap.put("HIHDHSLC", "Promoter #30");
		codeTypeMap.put("HIHSHDLC", "Promoter #30");
		return codeTypeMap;
	}

	@FXML
	public void validateField1() {
		if (textField1.getText().length() > 0) {
			if (!service.check(textField1, "vak")) {
				textField1.setText("");
			} else {
				service.tabAndUpper(textField1, textField2);
			}
		}

	}

	@FXML
	public void validateField2() {
		if (textField2.getText().length() > 0) {
			if (!service.check(textField2, "vak")) {
				textField2.setText("");
			} else {
				service.tabAndUpper(textField2, textField3);
			}
		}
	}

	@FXML
	public void validateField3() {
		if (textField3.getText().length() > 0) {
			if (!service.check(textField3, "vak")) {
				textField3.setText("");
			} else {
				service.tabAndUpper(textField3, textField4);
			}
		}
	}

	@FXML
	public void validateField4() {
		if (textField4.getText().length() > 0) {
			if (!service.check(textField4, "vak")) {
				textField4.setText("");
			} else {
				service.tabAndUpper(textField4, textField5);
			}
		}
	}

	@FXML
	public void validateField5() {
		if (textField5.getText().length() > 0) {
			if (!service.check(textField5, "vak")) {
				textField5.setText("");
			} else {
				service.tabAndUpper(textField5, textField6);
			}
		}
	}

	@FXML
	public void validateField6() {
		if (textField6.getText().length() > 0) {
			if (!service.check(textField6, "vak")) {
				textField6.setText("");
			} else {
				service.tabAndUpper(textField6, textField7);
			}
		}
	}

	@FXML
	public void validateField7() {
		if (textField7.getText().length() > 0) {
			if (!service.check(textField7, "vak")) {
				textField7.setText("");
			} else {
				service.tabAndUpper(textField7, textField8);
			}
		}
	}

	@FXML
	public void validateField8() {
		if (textField8.getText().length() > 0) {
			if (!service.check(textField8, "vak")) {
				textField8.setText("");
			} else {
				service.tabAndUpper(textField8, textField9);
			}
		}
	}

	@FXML
	public void validateField9() {
		if (textField9.getText().length() > 0) {
			if (!service.check(textField9, "vak")) {
				textField9.setText("");
			} else {
				service.tabAndUpper(textField9, textField10);
			}
		}
	}

	@FXML
	public void validateField10() {
		if (textField10.getText().length() > 0) {
			if (!service.check(textField10, "vak")) {
				textField10.setText("");
			} else {
				service.tabAndUpper(textField10, textField11);
			}
		}
	}

	@FXML
	public void validateField11() {
		if (textField11.getText().length() > 0) {
			if (!service.check(textField11, "vak")) {
				textField11.setText("");
			} else {
				service.tabAndUpper(textField11, textField12);
			}
		}
	}

	@FXML
	public void validateField12() {
		if (textField12.getText().length() > 0) {
			if (!service.check(textField12, "vak")) {
				textField12.setText("");
			} else {
				service.tabAndUpper(textField12, textField13);
			}
		}
	}

	@FXML
	public void validateField13() {
		if (textField13.getText().length() > 0) {
			if (!service.check(textField13, "vak")) {
				textField13.setText("");
			} else {
				service.tabAndUpper(textField13, textField14);
			}
		}
	}

	@FXML
	public void validateField14() {
		if (textField14.getText().length() > 0) {
			if (!service.check(textField14, "vak")) {
				textField14.setText("");
			} else {
				service.tabAndUpper(textField14, textField15);
			}
		}
	}

	@FXML
	public void validateField15() {
		if (textField15.getText().length() > 0) {
			if (!service.check(textField15, "vak")) {
				textField15.setText("");
			} else {
				service.tabAndUpper(textField15, textField16);
			}
		}
	}

	@FXML
	public void validateField16() {
		if (textField16.getText().length() > 0) {
			if (!service.check(textField16, "vak")) {
				textField16.setText("");
			} else {
				service.tabAndUpper(textField16, textField17);
			}
		}
	}

	@FXML
	public void validateField17() {
		if (textField17.getText().length() > 0) {
			if (!service.check(textField17, "vak")) {
				textField17.setText("");
			} else {
				service.tabAndUpper(textField17, textField18);
			}
		}
	}

	@FXML
	public void validateField18() {
		if (textField18.getText().length() > 0) {
			if (!service.check(textField18, "vak")) {
				textField18.setText("");
			} else {
				service.tabAndUpper(textField18, textField19);
			}
		}
	}

	@FXML
	public void validateField19() {
		if (textField19.getText().length() > 0) {
			if (!service.check(textField19, "vak")) {
				textField19.setText("");
			} else {
				service.tabAndUpper(textField19, textField20);
			}
		}
	}

	@FXML
	public void validateField20() {
		if (textField20.getText().length() > 0) {
			if (!service.check(textField20, "vak")) {
				textField20.setText("");
			} else {
				service.tabAndUpper(textField20, textField21);
			}
		}
	}

	@FXML
	public void validateField21() {
		if (textField21.getText().length() > 0) {
			if (!service.check(textField21, "vak")) {
				textField21.setText("");
			} else {
				service.tabAndUpper(textField21, textField22);
			}
		}
	}

	@FXML
	public void validateField22() {
		if (textField22.getText().length() > 0) {
			if (!service.check(textField22, "vak")) {
				textField22.setText("");
			} else {
				service.tabAndUpper(textField22, textField23);
			}
		}
	}

	@FXML
	public void validateField23() {
		if (textField23.getText().length() > 0) {
			if (!service.check(textField23, "vak")) {
				textField23.setText("");
			} else {
				service.tabAndUpper(textField23, textField24);
			}
		}
	}

	@FXML
	public void validateField24() {
		if (textField24.getText().length() > 0) {
			if (!service.check(textField24, "vak")) {
				textField24.setText("");
			} else {
				service.tabAndUpper(textField24, textField25);
			}
		}
	}

	@FXML
	public void validateField25() {
		if (textField25.getText().length() > 0) {
			if (!service.check(textField25, "vak")) {
				textField25.setText("");
			} else {
				service.tabAndUpper(textField25, textField26);
			}
		}
	}

	@FXML
	public void validateField26() {
		if (textField26.getText().length() > 0) {
			if (!service.check(textField26, "vak")) {
				textField26.setText("");
			} else {
				service.tabAndUpper(textField26, textField27);
			}
		}
	}

	@FXML
	public void validateField27() {
		if (textField27.getText().length() > 0) {
			if (!service.check(textField27, "vak")) {
				textField27.setText("");
			} else {
				service.tabAndUpper(textField27, textField28);
			}
		}
	}

	@FXML
	public void validateField28() {
		if (textField28.getText().length() > 0) {
			if (!service.check(textField28, "vak")) {
				textField28.setText("");
			} else {
				service.tabAndUpper(textField28, textField29);
			}
		}
	}

	@FXML
	public void validateField29() {
		if (textField29.getText().length() > 0) {
			if (!service.check(textField29, "vak")) {
				textField29.setText("");
			} else {
				service.tabAndUpper(textField29, textField30);
			}
		}
	}

	@FXML
	public void validateField30() {
		if (textField30.getText().length() > 0) {
			if (!service.check(textField30, "vak")) {
				textField30.setText("");
			} else {
				service.tabAndUpper(textField30, textField30);
			}
		}
	}

	@FXML
	public void validateFieldIq1() {
		if (textField1.getText().length() > 0) {
			if (!service.check(textField1, "iq")) {
				textField1.setText("");
			} else {
				service.tabAndUpper(textField1, textField2);
			}
		}
	}

	@FXML
	public void validateFieldIq2() {
		if (textField2.getText().length() > 0) {
			if (!service.check(textField2, "iq")) {
				textField2.setText("");
			} else {
				service.tabAndUpper(textField2, textField3);
			}
		}
	}

	@FXML
	public void validateFieldIq3() {
		if (textField3.getText().length() > 0) {
			if (!service.check(textField3, "iq")) {
				textField3.setText("");
			} else {
				service.tabAndUpper(textField3, textField4);
			}
		}
	}

	@FXML
	public void validateFieldIq4() {
		if (textField4.getText().length() > 0) {
			if (!service.check(textField4, "iq")) {
				textField4.setText("");
			} else {
				service.tabAndUpper(textField4, textField5);
			}
		}
	}

	@FXML
	public void validateFieldIq5() {
		if (textField5.getText().length() > 0) {
			if (!service.check(textField5, "iq")) {
				textField5.setText("");
			} else {
				service.tabAndUpper(textField5, textField6);
			}
		}
	}

	@FXML
	public void validateFieldIq6() {
		if (textField6.getText().length() > 0) {
			if (!service.check(textField6, "iq")) {
				textField6.setText("");
			} else {
				service.tabAndUpper(textField6, textField7);
			}
		}
	}

	@FXML
	public void validateFieldIq7() {
		if (textField7.getText().length() > 0) {
			if (!service.check(textField7, "iq")) {
				textField7.setText("");
			} else {
				service.tabAndUpper(textField7, textField8);
			}
		}
	}

	@FXML
	public void validateFieldIq8() {
		if (textField8.getText().length() > 0) {
			if (!service.check(textField8, "iq")) {
				textField8.setText("");
			} else {
				service.tabAndUpper(textField8, textField9);
			}
		}
	}

	@FXML
	public void validateFieldIq9() {
		if (textField9.getText().length() > 0) {
			if (!service.check(textField9, "iq")) {
				textField9.setText("");
			} else {
				service.tabAndUpper(textField9, textField10);
			}
		}
	}

	@FXML
	public void validateFieldIq10() {
		if (textField10.getText().length() > 0) {
			if (!service.check(textField10, "iq")) {
				textField10.setText("");
			} else {
				service.tabAndUpper(textField10, textField11);
			}
		}
	}

	@FXML
	public void validateFieldIq11() {
		if (textField11.getText().length() > 0) {
			if (!service.check(textField11, "iq")) {
				textField11.setText("");
			} else {
				service.tabAndUpper(textField11, textField12);
			}
		}
	}

	@FXML
	public void validateFieldIq12() {
		if (textField12.getText().length() > 0) {
			if (!service.check(textField12, "iq")) {
				textField12.setText("");
			} else {
				service.tabAndUpper(textField12, textField13);
			}
		}
	}

	@FXML
	public void validateFieldIq13() {
		if (textField13.getText().length() > 0) {
			if (!service.check(textField13, "iq")) {
				textField13.setText("");
			} else {
				service.tabAndUpper(textField13, textField14);
			}
		}
	}

	@FXML
	public void validateFieldIq14() {
		if (textField14.getText().length() > 0) {
			if (!service.check(textField14, "iq")) {
				textField14.setText("");
			} else {
				service.tabAndUpper(textField14, textField15);
			}
		}
	}

	@FXML
	public void validateFieldIq15() {
		if (textField15.getText().length() > 0) {
			if (!service.check(textField15, "iq")) {
				textField15.setText("");
			} else {
				service.tabAndUpper(textField15, textField16);
			}
		}
	}

	@FXML
	public void validateFieldIq16() {
		if (textField16.getText().length() > 0) {
			if (!service.check(textField16, "iq")) {
				textField16.setText("");
			} else {
				service.tabAndUpper(textField16, textField17);
			}
		}
	}

	@FXML
	public void validateFieldIq17() {
		if (textField17.getText().length() > 0) {
			if (!service.check(textField17, "iq")) {
				textField17.setText("");
			} else {
				service.tabAndUpper(textField17, textField18);
			}
		}
	}

	@FXML
	public void validateFieldIq18() {
		if (textField18.getText().length() > 0) {
			if (!service.check(textField18, "iq")) {
				textField18.setText("");
			} else {
				service.tabAndUpper(textField18, textField19);
			}
		}
	}

	@FXML
	public void validateFieldIq19() {
		if (textField19.getText().length() > 0) {
			if (!service.check(textField19, "iq")) {
				textField19.setText("");
			} else {
				service.tabAndUpper(textField19, textField20);
			}
		}
	}

	@FXML
	public void validateFieldIq20() {
		if (textField20.getText().length() > 0) {
			if (!service.check(textField20, "iq")) {
				textField20.setText("");
			} else {
				service.tabAndUpper(textField20, textField21);
			}
		}
	}

	@FXML
	public void validateFieldIq21() {
		if (textField21.getText().length() > 0) {
			if (!service.check(textField21, "iq")) {
				textField21.setText("");
			} else {
				service.tabAndUpper(textField21, textField22);
			}
		}
	}

	@FXML
	public void validateFieldIq22() {
		if (textField22.getText().length() > 0) {
			if (!service.check(textField22, "iq")) {
				textField22.setText("");
			} else {
				service.tabAndUpper(textField22, textField23);
			}
		}
	}

	@FXML
	public void validateFieldIq23() {
		if (textField23.getText().length() > 0) {
			if (!service.check(textField23, "iq")) {
				textField23.setText("");
			} else {
				service.tabAndUpper(textField23, textField24);
			}
		}
	}

	@FXML
	public void validateFieldIq24() {
		if (textField24.getText().length() > 0) {
			if (!service.check(textField24, "iq")) {
				textField24.setText("");
			} else {
				service.tabAndUpper(textField24, textField25);
			}
		}
	}

	@FXML
	public void validateFieldIq25() {
		if (textField25.getText().length() > 0) {
			if (!service.check(textField25, "iq")) {
				textField25.setText("");
			} else {
				service.tabAndUpper(textField25, textField26);
			}
		}
	}

	@FXML
	public void validateFieldIq26() {
		if (textField26.getText().length() > 0) {
			if (!service.check(textField26, "iq")) {
				textField26.setText("");
			} else {
				service.tabAndUpper(textField26, textField27);
			}
		}
	}

	@FXML
	public void validateFieldIq27() {
		if (textField27.getText().length() > 0) {
			if (!service.check(textField27, "iq")) {
				textField27.setText("");
			} else {
				service.tabAndUpper(textField27, textField28);
			}
		}
	}

	@FXML
	public void validateFieldIq28() {
		if (textField28.getText().length() > 0) {
			if (!service.check(textField28, "iq")) {
				textField28.setText("");
			} else {
				service.tabAndUpper(textField28, textField29);
			}
		}
	}

	@FXML
	public void validateFieldIq29() {
		if (textField29.getText().length() > 0) {
			if (!service.check(textField29, "iq")) {
				textField29.setText("");
			} else {
				service.tabAndUpper(textField29, textField30);
			}
		}
	}

	@FXML
	public void validateFieldIq30() {
		if (textField30.getText().length() > 0) {
			if (!service.check(textField30, "iq")) {
				textField30.setText("");
			} else {
				service.tabAndUpper(textField30, textField31);
			}
		}
	}

	@FXML
	public void validateFieldIq31() {
		if (textField31.getText().length() > 0) {
			if (!service.check(textField31, "iq")) {
				textField31.setText("");
			} else {
				service.tabAndUpper(textField31, textField32);
			}
		}
	}

	@FXML
	public void validateFieldIq32() {
		if (textField32.getText().length() > 0) {
			if (!service.check(textField32, "iq")) {
				textField32.setText("");
			} else {
				service.tabAndUpper(textField32, textField33);
			}
		}
	}

	@FXML
	public void validateFieldIq33() {
		if (textField33.getText().length() > 0) {
			if (!service.check(textField33, "iq")) {
				textField33.setText("");
			} else {
				service.tabAndUpper(textField33, textField34);
			}
		}
	}

	@FXML
	public void validateFieldIq34() {
		if (textField34.getText().length() > 0) {
			if (!service.check(textField34, "iq")) {
				textField34.setText("");
			} else {
				service.tabAndUpper(textField34, textField35);
			}
		}
	}

	@FXML
	public void validateFieldIq35() {
		if (textField35.getText().length() > 0) {
			if (!service.check(textField35, "iq")) {
				textField35.setText("");
			} else {
				service.tabAndUpper(textField35, textField36);
			}
		}
	}

	@FXML
	public void validateFieldIq36() {
		if (textField36.getText().length() > 0) {
			if (!service.check(textField36, "iq")) {
				textField36.setText("");
			} else {
				service.tabAndUpper(textField36, textField37);
			}
		}
	}

	@FXML
	public void validateFieldIq37() {
		if (textField37.getText().length() > 0) {
			if (!service.check(textField37, "iq")) {
				textField37.setText("");
			} else {
				service.tabAndUpper(textField37, textField38);
			}
		}
	}

	@FXML
	public void validateFieldIq38() {
		if (textField38.getText().length() > 0) {
			if (!service.check(textField38, "iq")) {
				textField38.setText("");
			} else {
				service.tabAndUpper(textField38, textField39);
			}
		}
	}

	@FXML
	public void validateFieldIq39() {
		if (textField39.getText().length() > 0) {
			if (!service.check(textField39, "iq")) {
				textField39.setText("");
			} else {
				service.tabAndUpper(textField39, textField40);
			}
		}
	}

	@FXML
	public void validateFieldIq40() {
		if (textField40.getText().length() > 0) {
			if (!service.check(textField40, "iq")) {
				textField40.setText("");
			} else {
				service.tabAndUpper(textField40, textField41);
			}
		}
	}

	@FXML
	public void validateFieldIq41() {
		if (textField41.getText().length() > 0) {
			if (!service.check(textField41, "iq")) {
				textField41.setText("");
			} else {
				service.tabAndUpper(textField41, textField42);
			}
		}
	}

	@FXML
	public void validateFieldIq42() {
		if (textField42.getText().length() > 0) {
			if (!service.check(textField42, "iq")) {
				textField42.setText("");
			} else {
				service.tabAndUpper(textField42, textField43);
			}
		}
	}

	@FXML
	public void validateFieldIq43() {
		if (textField43.getText().length() > 0) {
			if (!service.check(textField43, "iq")) {
				textField43.setText("");
			} else {
				service.tabAndUpper(textField43, textField44);
			}
		}
	}

	@FXML
	public void validateFieldIq44() {
		if (textField44.getText().length() > 0) {
			if (!service.check(textField44, "iq")) {
				textField44.setText("");
			} else {
				service.tabAndUpper(textField44, textField45);
			}
		}
	}

	@FXML
	public void validateFieldIq45() {
		if (textField45.getText().length() > 0) {
			if (!service.check(textField45, "iq")) {
				textField45.setText("");
			} else {
				service.tabAndUpper(textField45, textField46);
			}
		}
	}

	@FXML
	public void validateFieldIq46() {
		if (textField46.getText().length() > 0) {
			if (!service.check(textField46, "iq")) {
				textField46.setText("");
			} else {
				service.tabAndUpper(textField46, textField47);
			}
		}
	}

	@FXML
	public void validateFieldIq47() {
		if (textField47.getText().length() > 0) {
			if (!service.check(textField47, "iq")) {
				textField47.setText("");
			} else {
				service.tabAndUpper(textField47, textField48);
			}
		}
	}

	@FXML
	public void validateFieldIq48() {
		if (textField48.getText().length() > 0) {
			if (!service.check(textField48, "iq")) {
				textField48.setText("");
			} else {
				service.tabAndUpper(textField48, textField49);
			}
		}
	}

	@FXML
	public void validateFieldIq49() {
		if (textField49.getText().length() > 0) {
			if (!service.check(textField49, "iq")) {
				textField49.setText("");
			} else {
				service.tabAndUpper(textField49, textField50);
			}
		}
	}

	@FXML
	public void validateFieldIq50() {
		if (textField50.getText().length() > 0) {
			if (!service.check(textField50, "iq")) {
				textField50.setText("");
			} else {
				service.tabAndUpper(textField50, textField51);
			}
		}
	}

	@FXML
	public void validateFieldIq51() {
		if (textField51.getText().length() > 0) {
			if (!service.check(textField51, "iq")) {
				textField51.setText("");
			} else {
				service.tabAndUpper(textField51, textField52);
			}
		}
	}

	@FXML
	public void validateFieldIq52() {
		if (textField52.getText().length() > 0) {
			if (!service.check(textField52, "iq")) {
				textField52.setText("");
			} else {
				service.tabAndUpper(textField52, textField53);
			}
		}
	}

	@FXML
	public void validateFieldIq53() {
		if (textField53.getText().length() > 0) {
			if (!service.check(textField53, "iq")) {
				textField53.setText("");
			} else {
				service.tabAndUpper(textField53, textField54);
			}
		}
	}

	@FXML
	public void validateFieldIq54() {
		if (textField54.getText().length() > 0) {
			if (!service.check(textField54, "iq")) {
				textField54.setText("");
			} else {
				service.tabAndUpper(textField54, textField55);
			}
		}
	}

	@FXML
	public void validateFieldIq55() {
		if (textField55.getText().length() > 0) {
			if (!service.check(textField55, "iq")) {
				textField55.setText("");
			} else {
				service.tabAndUpper(textField55, textField56);
			}
		}
	}

	@FXML
	public void validateFieldIq56() {
		if (textField56.getText().length() > 0) {
			if (!service.check(textField56, "iq")) {
				textField56.setText("");
			} else {
				service.tabAndUpper(textField56, textField57);
			}
		}
	}

	@FXML
	public void validateFieldIq57() {
		if (textField57.getText().length() > 0) {
			if (!service.check(textField57, "iq")) {
				textField57.setText("");
			} else {
				service.tabAndUpper(textField57, textField58);
			}
		}
	}

	@FXML
	public void validateFieldIq58() {
		if (textField58.getText().length() > 0) {
			if (!service.check(textField58, "iq")) {
				textField58.setText("");
			} else {
				service.tabAndUpper(textField58, textField59);
			}
		}
	}

	@FXML
	public void validateFieldIq59() {
		if (textField59.getText().length() > 0) {
			if (!service.check(textField59, "iq")) {
				textField59.setText("");
			} else {
				service.tabAndUpper(textField59, textField60);
			}
		}
	}

	@FXML
	public void validateFieldIq60() {
		if (textField60.getText().length() > 0) {
			if (!service.check(textField60, "iq")) {
				textField60.setText("");
			} else {
				service.tabAndUpper(textField60, textField60);
			}
		}
	}

	@FXML
	public void validateFieldDisc1() {
		if (textField1.getText().length() > 0) {
			if (!service.check(textField1, "disc")) {
				textField1.setText("");
			} else {
				service.tabAndUpper(textField1, textField2);
			}
		}

	}

	@FXML
	public void validateFieldDisc2() {
		if (textField2.getText().length() > 0) {
			if (!service.check(textField2, "disc")) {
				textField2.setText("");
			}else if(textField2.getText().equalsIgnoreCase(textField1.getText())){
				service.duplicateAlert();
				textField2.setText("");
			}else {
				service.tabAndUpper(textField2, textField3);
			}
			
		}
	}
	
	@FXML
	public void validateFieldDisc3() {
		if (textField3.getText().length() > 0) {
			if (!service.check(textField3, "disc")) {
				textField3.setText("");
			} else {
				service.tabAndUpper(textField3, textField4);
			}
		}

	}
	
	@FXML
	public void validateFieldDisc4() {
		if (textField4.getText().length() > 0) {
			if (!service.check(textField4, "disc")) {
				textField4.setText("");
			}else if(textField4.getText().equalsIgnoreCase(textField3.getText())){
				service.duplicateAlert();
				textField4.setText("");
			}else {
				service.tabAndUpper(textField4, textField5);
			}
			
		}
	}
	
	@FXML
	public void validateFieldDisc5() {
		if (textField5.getText().length() > 0) {
			if (!service.check(textField5, "disc")) {
				textField5.setText("");
			} else {
				service.tabAndUpper(textField5, textField6);
			}
		}

	}
	
	@FXML
	public void validateFieldDisc6() {
		if (textField6.getText().length() > 0) {
			if (!service.check(textField6, "disc")) {
				textField6.setText("");
			}else if(textField6.getText().equalsIgnoreCase(textField5.getText())){
				service.duplicateAlert();
				textField6.setText("");
			}else {
				service.tabAndUpper(textField6, textField7);
			}
			
		}
	}
	
	@FXML
	public void validateFieldDisc7() {
		if (textField7.getText().length() > 0) {
			if (!service.check(textField7, "disc")) {
				textField7.setText("");
			} else {
				service.tabAndUpper(textField7, textField8);
			}
		}

	}
	
	@FXML
	public void validateFieldDisc8() {
		if (textField8.getText().length() > 0) {
			if (!service.check(textField8, "disc")) {
				textField8.setText("");
			}else if(textField8.getText().equalsIgnoreCase(textField7.getText())){
				service.duplicateAlert();
				textField8.setText("");
			}else {
				service.tabAndUpper(textField8, textField9);
			}
			
		}
	}
	
	@FXML
	public void validateFieldDisc9() {
		if (textField9.getText().length() > 0) {
			if (!service.check(textField9, "disc")) {
				textField9.setText("");
			} else {
				service.tabAndUpper(textField9, textField10);
			}
		}

	}
	
	@FXML
	public void validateFieldDisc10() {
		if (textField10.getText().length() > 0) {
			if (!service.check(textField10, "disc")) {
				textField10.setText("");
			}else if(textField10.getText().equalsIgnoreCase(textField9.getText())){
				service.duplicateAlert();
				textField10.setText("");
			}else {
				service.tabAndUpper(textField10, textField11);
			}
			
		}
	}
	
	@FXML
	public void validateFieldDisc11() {
		if (textField11.getText().length() > 0) {
			if (!service.check(textField11, "disc")) {
				textField11.setText("");
			} else {
				service.tabAndUpper(textField11, textField12);
			}
		}

	}
	
	@FXML
	public void validateFieldDisc12() {
		if (textField12.getText().length() > 0) {
			if (!service.check(textField12, "disc")) {
				textField12.setText("");
			}else if(textField12.getText().equalsIgnoreCase(textField11.getText())){
				service.duplicateAlert();
				textField12.setText("");
			}else {
				service.tabAndUpper(textField12, textField13);
			}
			
		}
	}
	
	@FXML
	public void validateFieldDisc13() {
		if (textField13.getText().length() > 0) {
			if (!service.check(textField13, "disc")) {
				textField13.setText("");
			} else {
				service.tabAndUpper(textField13, textField14);
			}
		}

	}
	
	@FXML
	public void validateFieldDisc14() {
		if (textField14.getText().length() > 0) {
			if (!service.check(textField14, "disc")) {
				textField14.setText("");
			}else if(textField14.getText().equalsIgnoreCase(textField13.getText())){
				service.duplicateAlert();
				textField14.setText("");
			}else {
				service.tabAndUpper(textField14, textField15);
			}
			
		}
	}
	
	@FXML
	public void validateFieldDisc15() {
		if (textField15.getText().length() > 0) {
			if (!service.check(textField15, "disc")) {
				textField15.setText("");
			} else {
				service.tabAndUpper(textField15, textField16);
			}
		}

	}
	
	@FXML
	public void validateFieldDisc16() {
		if (textField16.getText().length() > 0) {
			if (!service.check(textField16, "disc")) {
				textField16.setText("");
			}else if(textField16.getText().equalsIgnoreCase(textField15.getText())){
				service.duplicateAlert();
				textField16.setText("");
			}else {
				service.tabAndUpper(textField16, textField17);
			}
			
		}
	}
	
	@FXML
	public void validateFieldDisc17() {
		if (textField17.getText().length() > 0) {
			if (!service.check(textField17, "disc")) {
				textField17.setText("");
			} else {
				service.tabAndUpper(textField17, textField18);
			}
		}

	}
	
	@FXML
	public void validateFieldDisc18() {
		if (textField18.getText().length() > 0) {
			if (!service.check(textField18, "disc")) {
				textField18.setText("");
			}else if(textField18.getText().equalsIgnoreCase(textField17.getText())){
				service.duplicateAlert();
				textField18.setText("");
			}else {
				service.tabAndUpper(textField18, textField19);
			}
			
		}
	}
	
	@FXML
	public void validateFieldDisc19() {
		if (textField19.getText().length() > 0) {
			if (!service.check(textField19, "disc")) {
				textField19.setText("");
			} else {
				service.tabAndUpper(textField19, textField20);
			}
		}

	}
	
	@FXML
	public void validateFieldDisc20() {
		if (textField20.getText().length() > 0) {
			if (!service.check(textField20, "disc")) {
				textField20.setText("");
			}else if(textField20.getText().equalsIgnoreCase(textField19.getText())){
				service.duplicateAlert();
				textField20.setText("");
			}else {
				service.tabAndUpper(textField20, textField21);
			}
			
		}
	}
	
	@FXML
	public void validateFieldDisc21() {
		if (textField21.getText().length() > 0) {
			if (!service.check(textField21, "disc")) {
				textField21.setText("");
			} else {
				service.tabAndUpper(textField21, textField22);
			}
		}

	}
	
	@FXML
	public void validateFieldDisc22() {
		if (textField22.getText().length() > 0) {
			if (!service.check(textField22, "disc")) {
				textField22.setText("");
			}else if(textField22.getText().equalsIgnoreCase(textField21.getText())){
				service.duplicateAlert();
				textField22.setText("");
			}else {
				service.tabAndUpper(textField22, textField23);
			}
			
		}
	}
	
	@FXML
	public void validateFieldDisc23() {
		if (textField23.getText().length() > 0) {
			if (!service.check(textField23, "disc")) {
				textField23.setText("");
			} else {
				service.tabAndUpper(textField23, textField24);
			}
		}

	}
	
	@FXML
	public void validateFieldDisc24() {
		if (textField24.getText().length() > 0) {
			if (!service.check(textField24, "disc")) {
				textField24.setText("");
			}else if(textField24.getText().equalsIgnoreCase(textField23.getText())){
				service.duplicateAlert();
				textField24.setText("");
			}else {
				service.tabAndUpper(textField24, textField25);
			}
			
		}
	}
	
	@FXML
	public void validateFieldDisc25() {
		if (textField25.getText().length() > 0) {
			if (!service.check(textField25, "disc")) {
				textField25.setText("");
			} else {
				service.tabAndUpper(textField25, textField26);
			}
		}

	}
	
	@FXML
	public void validateFieldDisc26() {
		if (textField26.getText().length() > 0) {
			if (!service.check(textField26, "disc")) {
				textField26.setText("");
			}else if(textField26.getText().equalsIgnoreCase(textField25.getText())){
				service.duplicateAlert();
				textField26.setText("");
			}else {
				service.tabAndUpper(textField26, textField27);
			}
			
		}
	}
	
	@FXML
	public void validateFieldDisc27() {
		if (textField27.getText().length() > 0) {
			if (!service.check(textField27, "disc")) {
				textField27.setText("");
			} else {
				service.tabAndUpper(textField27, textField28);
			}
		}

	}
	
	@FXML
	public void validateFieldDisc28() {
		if (textField28.getText().length() > 0) {
			if (!service.check(textField28, "disc")) {
				textField28.setText("");
			}else if(textField28.getText().equalsIgnoreCase(textField27.getText())){
				service.duplicateAlert();
				textField28.setText("");
			}else {
				service.tabAndUpper(textField28, textField29);
			}
			
		}
	}
	
	@FXML
	public void validateFieldDisc29() {
		if (textField29.getText().length() > 0) {
			if (!service.check(textField29, "disc")) {
				textField29.setText("");
			} else {
				service.tabAndUpper(textField29, textField30);
			}
		}

	}
	
	@FXML
	public void validateFieldDisc30() {
		if (textField30.getText().length() > 0) {
			if (!service.check(textField30, "disc")) {
				textField30.setText("");
			}else if(textField30.getText().equalsIgnoreCase(textField29.getText())){
				service.duplicateAlert();
				textField30.setText("");
			}else {
				service.tabAndUpper(textField30, textField31);
			}
			
		}
	}
	
	@FXML
	public void validateFieldDisc31() {
		if (textField31.getText().length() > 0) {
			if (!service.check(textField31, "disc")) {
				textField31.setText("");
			} else {
				service.tabAndUpper(textField31, textField32);
			}
		}

	}
	
	@FXML
	public void validateFieldDisc32() {
		if (textField32.getText().length() > 0) {
			if (!service.check(textField32, "disc")) {
				textField32.setText("");
			}else if(textField32.getText().equalsIgnoreCase(textField31.getText())){
				service.duplicateAlert();
				textField32.setText("");
			}else {
				service.tabAndUpper(textField32, textField33);
			}
			
		}
	}
	@FXML
	public void validateFieldDisc33() {
		if (textField33.getText().length() > 0) {
			if (!service.check(textField33, "disc")) {
				textField33.setText("");
			} else {
				service.tabAndUpper(textField33, textField34);
			}
		}

	}
	
	@FXML
	public void validateFieldDisc34() {
		if (textField34.getText().length() > 0) {
			if (!service.check(textField34, "disc")) {
				textField34.setText("");
			}else if(textField34.getText().equalsIgnoreCase(textField33.getText())){
				service.duplicateAlert();
				textField34.setText("");
			}else {
				service.tabAndUpper(textField34, textField35);
			}
			
		}
	}
	@FXML
	public void validateFieldDisc35() {
		if (textField35.getText().length() > 0) {
			if (!service.check(textField35, "disc")) {
				textField35.setText("");
			} else {
				service.tabAndUpper(textField35, textField36);
			}
		}

	}
	
	@FXML
	public void validateFieldDisc36() {
		if (textField36.getText().length() > 0) {
			if (!service.check(textField36, "disc")) {
				textField36.setText("");
			}else if(textField36.getText().equalsIgnoreCase(textField35.getText())){
				service.duplicateAlert();
				textField36.setText("");
			}else {
				service.tabAndUpper(textField36, textField37);
			}
			
		}
	}
	@FXML
	public void validateFieldDisc37() {
		if (textField37.getText().length() > 0) {
			if (!service.check(textField37, "disc")) {
				textField37.setText("");
			} else {
				service.tabAndUpper(textField37, textField38);
			}
		}

	}
	
	@FXML
	public void validateFieldDisc38() {
		if (textField38.getText().length() > 0) {
			if (!service.check(textField38, "disc")) {
				textField38.setText("");
			}else if(textField38.getText().equalsIgnoreCase(textField37.getText())){
				service.duplicateAlert();
				textField38.setText("");
			}else {
				service.tabAndUpper(textField38, textField39);
			}
			
		}
	}
	@FXML
	public void validateFieldDisc39() {
		if (textField39.getText().length() > 0) {
			if (!service.check(textField39, "disc")) {
				textField39.setText("");
			} else {
				service.tabAndUpper(textField39, textField40);
			}
		}

	}
	
	@FXML
	public void validateFieldDisc40() {
		if (textField40.getText().length() > 0) {
			if (!service.check(textField40, "disc")) {
				textField40.setText("");
			}else if(textField40.getText().equalsIgnoreCase(textField39.getText())){
				service.duplicateAlert();
				textField40.setText("");
			}else {
				service.tabAndUpper(textField40, textField41);
			}
			
		}
	}
	@FXML
	public void validateFieldDisc41() {
		if (textField41.getText().length() > 0) {
			if (!service.check(textField41, "disc")) {
				textField41.setText("");
			} else {
				service.tabAndUpper(textField41, textField42);
			}
		}

	}
	
	@FXML
	public void validateFieldDisc42() {
		if (textField42.getText().length() > 0) {
			if (!service.check(textField42, "disc")) {
				textField42.setText("");
			}else if(textField42.getText().equalsIgnoreCase(textField41.getText())){
				service.duplicateAlert();
				textField42.setText("");
			}else {
				service.tabAndUpper(textField42, textField43);
			}
			
		}
	}
	
	@FXML
	public void validateFieldDisc43() {
		if (textField43.getText().length() > 0) {
			if (!service.check(textField43, "disc")) {
				textField43.setText("");
			} else {
				service.tabAndUpper(textField43, textField44);
			}
		}

	}
	
	@FXML
	public void validateFieldDisc44() {
		if (textField44.getText().length() > 0) {
			if (!service.check(textField44, "disc")) {
				textField44.setText("");
			}else if(textField44.getText().equalsIgnoreCase(textField43.getText())){
				service.duplicateAlert();
				textField44.setText("");
			}else {
				service.tabAndUpper(textField44, textField45);
			}
			
		}
	}
	
	@FXML
	public void validateFieldDisc45() {
		if (textField45.getText().length() > 0) {
			if (!service.check(textField45, "disc")) {
				textField45.setText("");
			} else {
				service.tabAndUpper(textField45, textField46);
			}
		}

	}
	
	@FXML
	public void validateFieldDisc46() {
		if (textField46.getText().length() > 0) {
			if (!service.check(textField46, "disc")) {
				textField46.setText("");
			}else if(textField46.getText().equalsIgnoreCase(textField45.getText())){
				service.duplicateAlert();
				textField46.setText("");
			}else {
				service.tabAndUpper(textField46, textField47);
			}
			
		}
	}
	@FXML
	public void validateFieldDisc47() {
		if (textField47.getText().length() > 0) {
			if (!service.check(textField47, "disc")) {
				textField47.setText("");
			} else {
				service.tabAndUpper(textField47, textField48);
			}
		}

	}
	
	@FXML
	public void validateFieldDisc48() {
		if (textField48.getText().length() > 0) {
			if (!service.check(textField48, "disc")) {
				textField48.setText("");
			}else if(textField48.getText().equalsIgnoreCase(textField47.getText())){
				service.duplicateAlert();
				textField48.setText("");
			}else {
				service.tabAndUpper(textField48, textField48);
			}
			
		}
	}
	
	public void limitField(TextField field) {
		field.lengthProperty().addListener(new ChangeListener<Number>() {

	            @Override
	            public void changed(ObservableValue<? extends Number> observable,
	                    Number oldValue, Number newValue) {
	                if (newValue.intValue() > oldValue.intValue()) {
	                    // Check if the new character is greater than LIMIT
	                    if (field.getText().length() >= 20) {

	                        // if it's 11th character then just setText to previous
	                        // one
	                    	field.setText(field.getText().substring(0, 20));
	                    }
	                }
	            }
	        });
	}
	
	
	
}
