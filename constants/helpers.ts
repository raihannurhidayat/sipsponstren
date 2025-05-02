export const formatted = new Intl.DateTimeFormat("id-ID", {
  day: "2-digit",
  month: "long",
  year: "numeric",
}).format(new Date());

export const formattedYear = new Intl.DateTimeFormat("id-ID", {
  year: "numeric",
}).format(new Date());

export function formatSlugToTitle(slug: string): string {
  return slug
    .split("-") // pisahkan berdasarkan tanda "-"
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // kapitalisasi
    .join(" ");
}

export function incrementNomenclature(currentNomenclature: string): string {
  // Pisahkan bagian-bagian nomenklatur
  const parts = currentNomenclature.split("/");

  // Validasi format
  if (parts.length !== 6) {
    throw new Error("Format nomenklatur tidak valid");
  }

  // Ambil dan proses nomor urut
  const sequenceNumber = parts[0];
  const currentNumber = parseInt(sequenceNumber, 10);
  const newNumber = (currentNumber + 1)
    .toString()
    .padStart(sequenceNumber.length, "0");

  // Rebuild nomenklatur
  return [
    newNumber,
    parts[1], // Kode institusi (PPMHF)
    parts[2], // Kode jenis surat (A)
    parts[3], // Kode bidang (SKS)
    parts[4], // Kode periode (I)
    new Date().getFullYear(), // Tahun current (opsional)
  ].join("/");
}

export function decrementNomenclature(currentNomenclature: string): string {
  // Pisahkan bagian-bagian nomenklatur
  const parts = currentNomenclature.split("/");

  // Validasi format
  if (parts.length !== 6) {
    throw new Error("Format nomenklatur tidak valid");
  }

  // Ambil dan proses nomor urut
  const sequenceNumber = parts[0];
  const currentNum = parseInt(sequenceNumber, 10);

  // Validasi angka tidak bisa negatif
  if (currentNum <= 0) {
    throw new Error("Nomor urut tidak bisa dikurangi lagi");
  }

  const newNumber = (currentNum - 1)
    .toString()
    .padStart(sequenceNumber.length, "0");

  // Rebuild nomenklatur
  return [
    newNumber,
    parts[1], // Kode institusi (PPMHF)
    parts[2], // Kode jenis surat (A)
    parts[3], // Kode bidang (SKS)
    parts[4], // Kode periode (I)
    parts[5], // Tahun
  ].join("/");
}

export function resetTo001WithCurrentYear(currentNomenclature: string): string {
  // Pisahkan bagian-bagian nomenklatur
  const parts = currentNomenclature.split("/");

  // Validasi format
  if (parts.length !== 6) {
    throw new Error("Format nomenklatur tidak valid");
  }

  // Ambil dan validasi nomor urut
  const sequence = parts[0];
  const sequenceLength = sequence.length;

  if (!/^\d+$/.test(sequence)) {
    throw new Error("Bagian sequence harus angka");
  }

  // Generate 001 dengan panjang digit yang sama
  const newSequence = "1".padStart(sequenceLength, "0");

  // Dapatkan tahun saat ini
  const currentYear = new Date().getFullYear().toString();

  // Rebuild nomenklatur
  return [
    newSequence,
    parts[1], // Kode institusi
    parts[2], // Kode jenis surat
    parts[3], // Kode bidang
    parts[4], // Kode periode
    currentYear,
  ].join("/");
}
