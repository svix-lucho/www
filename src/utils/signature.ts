export const verifySignature = (
  generatedSignature: string,
  userSignatures: string
) => {
  const expectedSignature = generatedSignature.split(",")[1];

  const passedSignatures = userSignatures.split(" ");

  for (const versionedSignature of passedSignatures) {
    const [version, signature] = versionedSignature.split(",");

    if (version !== "v1") {
      continue;
    }

    if (signature === expectedSignature) {
      return true;
    }
  }

  return false;
};
