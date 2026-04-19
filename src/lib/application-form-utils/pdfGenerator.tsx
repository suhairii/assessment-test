import React from "react";
import { Document, Page, Text, View, StyleSheet, pdf } from "@react-pdf/renderer";
import { ApplicationFormData } from "@/lib/schema";

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 10, fontFamily: "Helvetica", color: "#000" },
  section: { marginBottom: 15, borderBottom: 1, borderBottomColor: "#000", paddingBottom: 5 },
  sectionTitle: { fontSize: 14, fontWeight: "bold", marginBottom: 5, textTransform: "uppercase" },
  row: { flexDirection: "row", marginBottom: 3 },
  label: { width: 150, fontWeight: "bold" },
  value: { flex: 1 },
  header: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 20, textTransform: "uppercase" }
});

const ApplicationPDF = ({ data }: { data: ApplicationFormData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Job Application Form</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Section A: Personal Data</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Full Name:</Text>
          <Text style={styles.value}>{data.personalData.fullName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>KTP No:</Text>
          <Text style={styles.value}>{data.personalData.ktpNo}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Place/Date of Birth:</Text>
          <Text style={styles.value}>{data.personalData.placeOfBirth}, {data.personalData.dateOfBirth}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Email/Phone:</Text>
          <Text style={styles.value}>{data.personalData.email} / {data.personalData.phone}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Section C: Education</Text>
        {data.education.map((edu, i) => (
          <View key={i} style={styles.row}>
            <Text style={styles.label}>{edu.level}:</Text>
            <Text style={styles.value}>{edu.institution} ({edu.yearStart}-{edu.yearEnd}) - GPA: {edu.gpa}</Text>
          </View>
        ))}
      </View>

      {/* Add more sections here mapping the Zod schema */}
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Final Details</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Expected Salary:</Text>
          <Text style={styles.value}>{data.finalDetails.expectedSalary}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Availability:</Text>
          <Text style={styles.value}>{data.finalDetails.availability}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export const exportToPDF = async (data: ApplicationFormData) => {
  const blob = await pdf(<ApplicationPDF data={data} />).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `Application_${data.personalData.fullName.replace(/\s+/g, "_")}.pdf`;
  link.click();
};
