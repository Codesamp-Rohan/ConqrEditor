import mammoth from 'mammoth';

export async function parseDocument(file) {
  const extension = file.name.split('.').pop()?.toLowerCase();

  // TXT + MD
  if (extension === 'txt' || extension === 'md') {
    return await file.text();
  }

  // DOCX
  if (extension === 'docx') {
    const arrayBuffer = await file.arrayBuffer();

    const result = await mammoth.extractRawText({
      arrayBuffer,
    });

    return result.value;
  }

  throw new Error('Unsupported file type');
}
