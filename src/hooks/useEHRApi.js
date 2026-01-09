const BACKEND_URL =
  "https://didactic-dollop-4j5jgp497vrpcj4g7-8001.app.github.dev";

export async function transcribeAudio(audioBlob) {
  const formData = new FormData();
  formData.append("file", audioBlob);

  const res = await fetch(`${BACKEND_URL}/api/transcribe`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Audio transcription failed");
  }

  return res.json(); // { transcript }
}

export async function generateFHIR(transcript) {
  const res = await fetch(`${BACKEND_URL}/api/generate-fhir`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ transcript }),
  });

  if (!res.ok) {
    throw new Error("FHIR generation failed");
  }

  return res.json(); // FHIR Bundle
}
