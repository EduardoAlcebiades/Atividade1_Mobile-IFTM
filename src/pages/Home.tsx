import React, { useCallback, useState } from "react";

import { StyleSheet, Text, SafeAreaView, StatusBar, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Button } from "../components/Button";

interface Form {
  height?: number;
  weight?: number;
  imc?: number;
  classImc?:
    | "MAGREZA"
    | "NORMAL"
    | "SOBREPESO"
    | "OBESIDADE"
    | "OBESIDADE GRAVE";
}

export function Home() {
  const [form, setForm] = useState<Form>({});

  const handleCalculate = useCallback(() => {
    const { height, weight } = form;

    if (!height) return;
    if (!weight) return;

    const imc = Number(weight) / Math.pow(Number(height), 2);
    const classImc =
      imc < 18.5
        ? "MAGREZA"
        : imc < 24.9
        ? "NORMAL"
        : imc < 29.9
        ? "SOBREPESO"
        : imc < 39.9
        ? "OBESIDADE"
        : "OBESIDADE GRAVE";

    setForm((prev) => ({ ...prev, imc, classImc }));
  }, [form, setForm]);

  const handleInputChange = useCallback(
    (name: keyof Form, value: string) => {
      setForm((prev) => ({
        ...prev,
        [name]: value.replace(",", "."),
      }));
    },
    [setForm]
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Cálculo de IMC</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Medidas</Text>
        <View style={styles.inputGroup}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Altura</Text>

            <TextInput
              keyboardType="number-pad"
              style={styles.input}
              value={form.height?.toString() || ""}
              onChangeText={(text) => handleInputChange("height", text)}
              placeholder="Altura"
              placeholderTextColor="#c1bccc"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Peso</Text>

            <TextInput
              keyboardType="number-pad"
              style={styles.input}
              value={form.weight?.toString() || ""}
              onChangeText={(text) => handleInputChange("weight", text)}
              placeholder="Peso"
              placeholderTextColor="#c1bccc"
            />
          </View>
        </View>

        <View style={styles.divider} />

        <Text style={styles.title}>Resultado</Text>
        <View style={styles.inputGroup}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>IMC</Text>

            <TextInput
              keyboardType="number-pad"
              style={[styles.input, styles.disabled]}
              value={form.imc?.toFixed(2) || ""}
              placeholder="IMC"
              placeholderTextColor="#c1bccc"
              editable={false}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Classificação</Text>

            <TextInput
              keyboardType="number-pad"
              style={[styles.input, styles.disabled]}
              value={form.classImc?.toString() || ""}
              placeholder="Classificação"
              placeholderTextColor="#c1bccc"
              editable={false}
            />
          </View>
        </View>

        <Button
          style={styles.button}
          text="Calcular"
          onPress={handleCalculate}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 60,
    padding: 20,
    backgroundColor: "#2bd4eb",
  },
  headerText: {
    color: "#fff",
    fontSize: 22,
  },
  content: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f0f0f7",
  },
  title: {
    alignSelf: "flex-start",
    marginBottom: 20,
    color: "#21bdd1",
    fontSize: 20,
    fontWeight: "bold",
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  formGroup: {
    flex: 1,
    maxWidth: "48%",
    height: "100%",
  },
  label: {
    marginBottom: 5,
    color: "#4d5050",
  },
  input: {
    width: "100%",
    minHeight: 50,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  disabled: {
    backgroundColor: "#ececec",
    color: "#000",
    borderWidth: 1,
    borderColor: "#ddd",
    opacity: 0.8,
  },
  divider: {
    width: "100%",
    height: 2,
    backgroundColor: "#ddd",
    marginVertical: 30,
  },
  button: {
    marginTop: "auto",
  },
});
