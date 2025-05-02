import { formatted, formattedYear } from "./helpers";

const name = "Fachri Abbas Mirsi";
const born = "Purwakarta, 21 April 2009";
const address =
  "Kp. Cilegong Utara 003/001, Desa Jatiluhur Kec. Jatiluhur, Kab. Purwakarta";
const year = "2024";

export const templateSuratKeterangan = `<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <title>Surat Keterangan Santri Aktif</title>
  </head>
  <body>
    <div>
      <div>
        <div style="width: 100%; position: relative">
          <img
            src="/assets/kop.jpg"
            alt="kop surat"
            style="
              width: 100%;
              height: auto;
              display: block;
              object-fit: contain;
            "
          />
        </div>
      </div>

      <div style="text-align: center">
        <h1
          style="
            font-weight: bold;
            font-size: 0.75rem;
            text-decoration: underline;
            margin-bottom: 8px;
          "
        >
          SURAT KETERANGAN
        </h1>
        <p style="font-size: 0.75rem; margin: 0">
          NO : 001/SKT/A/PPMHF/III/2024
        </p>
      </div>

      <div style="margin-top: 24px; padding: 0 52px; max-width: 75%">
        <div>
          <p style="font-size: 0.7rem">Yang bertandatangan dibawah ini:</p>

          <div
            style="
              display: flex;
              align-items: center;
              flex-direction: row;
              margin: 8px 0;
            "
          >
            <p style="margin: 0; font-size: 0.7rem">
              Nama
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
            <p style="margin: 0; font-size: 0.7rem">
              : KH. Dudung Abdullah Faqih
            </p>
          </div>

          <div style="display: flex; align-items: center; flex-direction: row">
            <p style="margin: 0; font-size: 0.7rem">
              Jabatan
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
            <p style="margin: 0; font-size: 0.7rem">: Pimpinan Umum</p>
          </div>
        </div>

        <div style="margin-top: 28px">
          <p style="font-size: 0.7rem">Dengan ini menerangkan bahwa:</p>

          <div
            style="
              display: flex;
              align-items: center;
              flex-direction: row;
              margin: 8px 0;
            "
          >
            <p style="margin: 0; font-size: 0.7rem">
              Nama
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
            <p style="margin: 0; font-size: 0.7rem">: ${name}</p>
          </div>

          <div style="display: flex; align-items: center; flex-direction: row">
            <p style="margin: 0; font-size: 0.7rem">
              Tempat Tanggal Lahir
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
            <p style="margin: 0; font-size: 0.7rem">: ${born}</p>
          </div>
          <div
            style="
              display: flex;
              align-items: center;
              flex-direction: row;
              margin: 8px 0;
            "
          >
            <p style="margin: 0; font-size: 0.7rem">
              Alamat
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
            <p style="margin: 0; font-size: 0.7rem">: ${address}</p>
          </div>
          <div style="display: flex; align-items: center; flex-direction: row">
            <p style="margin: 0; font-size: 0.7rem">
              Tahun Masuk
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
            <p style="margin: 0; font-size: 0.7rem">: ${year}</p>
          </div>
        </div>
      </div>

      <div
        style="
          display: flex;
          align-items: center;
          flex-direction: row;
          padding: 0 52px;
          margin-top: 24px;
        "
      >
        <p style="margin: 0; font-size: 0.7rem; text-align: justify">
          Adalah benar santri di Pondok Pesantren Miftahul Huda Al-Faqih
          Manonjaya Kabupaten Tasikmalaya dan masih aktif dari awal tahun masuk
          sampai dengan saat ini.
        </p>
      </div>
      <div
        style="
          display: flex;
          align-items: center;
          flex-direction: row;
          padding: 0 52px;
          margin-top: 24px;
        "
      >
        <p style="margin: 0; font-size: 0.7rem; text-align: justify">
          Demikian surat keterangan ini dibuat untuk digunakan sebagaimana
          mestinya.
        </p>
      </div>

      <div
        style="
          position: relative;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          margin-top: 100px;
          padding: 0 52px;
        "
      >
        <div style="display: flex; align-items: center">
          <p style="margin: 0; font-size: 0.7rem; text-align: center">
            Tasikmalaya, ${formatted}
          </p>
          <p style="margin: 0; font-size: 0.7rem">
            Pimpinan Umum Pondok Pesantren
          </p>
          <p style="margin: 0; font-size: 0.7rem">Miftahul Huda Al-Faqih</p>
          <br /><br /><br />
          <p style="margin: 0; font-size: 0.7rem">
            <strong>KH. Dudung Abdullah Faqih</strong>
          </p>
        </div>

        <div style="width: 100%; position: absolute">
          <img
            src="/assets/tanda.png"
            alt="kop surat"
            style="
              width: 40%;
              height: auto;
              display: block;
              object-fit: contain;
              right: -320;
              z-index: -100;
              top: 10;
            "
          />
        </div>

        <div style="width: 100%; position: absolute">
          <img
            src="/assets/tangan.png"
            alt="kop surat"
            style="
              width: 30%;
              height: auto;
              display: block;
              object-fit: contain;
              right: -400;
              z-index: -100;
              top: 10;
            "
          />
        </div>
      </div>
    </div>
  </body>
</html>
`;

export const templateSuratIzin = `
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <title>Surat Keterangan Santri Aktif</title>
  </head>

  <style>
    .page-break {
      page-break-before: always; /* untuk memulai di halaman baru */
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    table,
    th,
    td {
      border: 1px solid black;
    }
    th,
    td {
      font-size: 0.7rem;
      font-weight: normal;
      padding: 8px;
      text-align: left;
    }
  </style>
  <body>
    <div>
      <div>
        <div style="width: 100%; position: relative">
          <img
            src="/assets/kop.jpg"
            alt="kop surat"
            style="
              width: 100%;
              height: auto;
              display: block;
              object-fit: contain;
            "
          />
        </div>
      </div>

      <div style="text-align: center">
        <h1
          style="
            font-weight: bold;
            font-size: 0.75rem;
            text-decoration: underline;
            margin-bottom: 8px;
          "
        >
          SURAT IZIN ROMBONGAN
        </h1>
        <p style="font-size: 0.75rem; margin: 0">
          Nomor : 001/PPMHF/A/SIR/I/2024
        </p>
      </div>

      <div style="padding: 0 52px">
        <div>
          <p style="font-size: 0.7rem">
            Yang bertandatangan dibawah ini Pimpinan Umum Pondok Pesantren
            Miftahul Huda Al-Faqih. Memberikan izin kepada :
          </p>

          <div
            style="
              display: flex;
              align-items: center;
              flex-direction: row;
              margin: 4px 0;
            "
          >
            <p style="margin: 0; font-size: 0.7rem">
              Ketua Rombongan
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
            <p style="margin: 0; font-size: 0.7rem">
              : KH. Dudung Abdullah Faqih
            </p>
          </div>

          <div
            style="
              display: flex;
              align-items: center;
              flex-direction: row;
              margin: 4px 0;
            "
          >
            <p style="margin: 0; font-size: 0.7rem">
              Kelas
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
            <p style="margin: 0; font-size: 0.7rem">: Pimpinan Umum</p>
          </div>

          <div
            style="
              display: flex;
              align-items: center;
              flex-direction: row;
              margin: 4px 0;
            "
          >
            <p style="margin: 0; font-size: 0.7rem">
              Kepentingan
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
            <p style="margin: 0; font-size: 0.7rem">: Pimpinan Umum</p>
          </div>

          <div
            style="
              display: flex;
              align-items: center;
              flex-direction: row;
              margin: 4px 0;
            "
          >
            <p style="margin: 0; font-size: 0.7rem">
              Dari/Sampai
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
            <p style="margin: 0; font-size: 0.7rem">: Pimpinan Umum</p>
          </div>

          <div
            style="
              display: flex;
              align-items: center;
              flex-direction: row;
              margin: 4px 0;
            "
          >
            <p style="margin: 0; font-size: 0.7rem">
              Angota Rombongan
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
            <p style="margin: 0; font-size: 0.7rem">: Terlampir</p>
          </div>
        </div>

        <div style="margin-top: 16px; text-align: justify">
          <p style="font-size: 0.7rem">
            Untuk bisa mengikuti kegiatan di luar komplek Pondok Pesantren
            Miftahul Huda Al-Faqih. Sesuai dengan kepentingan dan durasi yang
            telah di tentukan
          </p>
        </div>
      </div>
      <div
        style="
          display: flex;
          align-items: center;
          flex-direction: row;
          padding: 0 52px;
          margin: 0;
        "
      >
        <p style="margin: 0; font-size: 0.7rem; text-align: justify">
          Demikian surat keterangan ini dibuat untuk digunakan sebagaimana
          mestinya.
        </p>
      </div>

      <div
        style="
          position: relative;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          margin-top: 100px;
          padding: 0 52px;
        "
      >
        <div style="display: flex; align-items: center">
          <p style="margin: 0; font-size: 0.7rem; text-align: center">
            Tasikmalaya, ${formatted}
          </p>
          <p style="margin: 0; font-size: 0.7rem">
            Pimpinan Umum Pondok Pesantren
          </p>
          <p style="margin: 0; font-size: 0.7rem">Miftahul Huda Al-Faqih</p>
          <br /><br /><br />
          <p style="margin: 0; font-size: 0.7rem">
            <strong>KH. Dudung Abdullah Faqih</strong>
          </p>
        </div>

        <div style="width: 100%; position: absolute">
          <img
            src="/assets/tanda.png"
            alt="kop surat"
            style="
              width: 40%;
              height: auto;
              display: block;
              object-fit: contain;
              right: -320;
              z-index: -100;
              top: 10;
            "
          />
        </div>

        <div style="width: 100%; position: absolute">
          <img
            src="/assets/tangan.png"
            alt="kop surat"
            style="
              width: 30%;
              height: auto;
              display: block;
              object-fit: contain;
              right: -400;
              z-index: -100;
              top: 10;
            "
          />
        </div>
      </div>

      <p><br /></p>
      <p><br /></p>
      <p><br /></p>
      <p><br /></p>

      <div style="margin-top: -48px">
        <div style="width: 100%; position: relative; background: red">
          <img
            src="/assets/kop.jpg"
            alt="kop surat"
            style="
              width: 100%;
              height: auto;
              display: block;
              object-fit: contain;
            "
          />
        </div>

        <div style="margin-top: 24px">
          <table
            style="width: 100%; border-collapse: collapse; font-size: 0.7rem"
          >
            <thead>
              <tr>
                <th
                  style="
                    width: 5%;
                    border: 1px solid black;
                    text-align: left;
                    padding: 4px;
                  "
                >
                  NO
                </th>
                <th
                  style="
                    width: 50%;
                    border: 1px solid black;
                    text-align: left;
                    padding: 4px;
                  "
                >
                  Nama Anggota Rombongan
                </th>
                <th
                  style="
                    width: 20%;
                    border: 1px solid black;
                    text-align: left;
                    padding: 4px;
                  "
                >
                  Kelas
                </th>
                <th
                  style="
                    width: 25%;
                    border: 1px solid black;
                    text-align: left;
                    padding: 4px;
                  "
                >
                  Asrama
                </th>
              </tr>
            </thead>
            <tbody>
              ${[...Array(15)]
                .map(
                  (_, i) => `
              <tr>
                <td
                  style="
                    width: 5%;
                    border: 1px solid black;
                    text-align: left;
                    padding: 4px;
                  "
                >
                  ${i + 1}
                </td>
                <td
                  style="
                    width: 50%;
                    border: 1px solid black;
                    text-align: left;
                    padding: 4px;
                  "
                >
                  Raihan
                </td>
                <td
                  style="
                    width: 20%;
                    border: 1px solid black;
                    text-align: left;
                    padding: 4px;
                  "
                ></td>
                <td
                  style="
                    width: 25%;
                    border: 1px solid black;
                    text-align: left;
                    padding: 4px;
                  "
                ></td>
              </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </body>
</html>
`;

export function templateSurat(data: string) {
  const value = JSON.parse(data);

  return `<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <title>Surat Keterangan Santri Aktif</title>
  </head>
  <body>
    <div>
      <div>
        <div style="width: 100%; position: relative">
          <img
            src="/assets/kop.jpg"
            alt="kop surat"
            style="
              width: 100%;
              height: auto;
              display: block;
              object-fit: contain;
            "
          />
        </div>
      </div>

      <div style="text-align: center">
        <h1
          style="
            font-weight: bold;
            font-size: 0.75rem;
            text-decoration: underline;
            margin-bottom: 8px;
          "
        >
          SURAT KETERANGAN
        </h1>
        <p style="font-size: 0.75rem; margin: 0">
          NO : ${value.nomenclature}
        </p>
      </div>

      <div style="margin-top: 24px; padding: 0 52px; max-width: 75%">
        <div>
          <p style="font-size: 0.7rem">Yang bertandatangan dibawah ini:</p>

          <div
            style="
              display: flex;
              align-items: center;
              flex-direction: row;
              margin: 8px 0;
            "
          >
            <p style="margin: 0; font-size: 0.7rem">
              Nama
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
            <p style="margin: 0; font-size: 0.7rem">
              : KH. Dudung Abdullah Faqih
            </p>
          </div>

          <div style="display: flex; align-items: center; flex-direction: row">
            <p style="margin: 0; font-size: 0.7rem">
              Jabatan
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
            <p style="margin: 0; font-size: 0.7rem">: Pimpinan Umum</p>
          </div>
        </div>

        <div style="margin-top: 28px">
          <p style="font-size: 0.7rem">Dengan ini menerangkan bahwa:</p>

          <div
            style="
              display: flex;
              align-items: center;
              flex-direction: row;
              margin: 8px 0;
            "
          >
            <p style="margin: 0; font-size: 0.7rem">
              Nama
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
            <p style="margin: 0; font-size: 0.7rem">: ${value.name}</p>
          </div>

          <div style="display: flex; align-items: center; flex-direction: row">
            <p style="margin: 0; font-size: 0.7rem">
              Tempat Tanggal Lahir
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
            <p style="margin: 0; font-size: 0.7rem">: ${value.born}</p>
          </div>
          <div
            style="
              display: flex;
              align-items: center;
              flex-direction: row;
              margin: 8px 0;
            "
          >
            <p style="margin: 0; font-size: 0.7rem">
              Alamat
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
            <p style="margin: 0; font-size: 0.7rem">: ${value.address}</p>
          </div>
          <div style="display: flex; align-items: center; flex-direction: row">
            <p style="margin: 0; font-size: 0.7rem">
              Tahun Masuk
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
            <p style="margin: 0; font-size: 0.7rem">: ${value.year}</p>
          </div>
        </div>
      </div>

      <div
        style="
          display: flex;
          align-items: center;
          flex-direction: row;
          padding: 0 52px;
          margin-top: 24px;
        "
      >
        <p style="margin: 0; font-size: 0.7rem; text-align: justify">
          Adalah benar santri di Pondok Pesantren Miftahul Huda Al-Faqih
          Manonjaya Kabupaten Tasikmalaya dan masih aktif dari awal tahun masuk
          sampai dengan saat ini.
        </p>
      </div>
      <div
        style="
          display: flex;
          align-items: center;
          flex-direction: row;
          padding: 0 52px;
          margin-top: 24px;
        "
      >
        <p style="margin: 0; font-size: 0.7rem; text-align: justify">
          Demikian surat keterangan ini dibuat untuk digunakan sebagaimana
          mestinya.
        </p>
      </div>

      <div
        style="
          position: relative;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          margin-top: 100px;
          padding: 0 52px;
        "
      >
        <div style="display: flex; align-items: center">
          <p style="margin: 0; font-size: 0.7rem; text-align: center">
            Tasikmalaya, ${formatted}
          </p>
          <p style="margin: 0; font-size: 0.7rem">
            Pimpinan Umum Pondok Pesantren
          </p>
          <p style="margin: 0; font-size: 0.7rem">Miftahul Huda Al-Faqih</p>
          <br /><br /><br />
          <p style="margin: 0; font-size: 0.7rem">
            <strong>KH. Dudung Abdullah Faqih</strong>
          </p>
        </div>

        <div style="width: 100%; position: absolute">
          <img
            src="/assets/tanda.png"
            alt="kop surat"
            style="
              width: 40%;
              height: auto;
              display: block;
              object-fit: contain;
              right: -320;
              z-index: -100;
              top: 10;
            "
          />
        </div>

        <div style="width: 100%; position: absolute">
          <img
            src="/assets/tangan.png"
            alt="kop surat"
            style="
              width: 30%;
              height: auto;
              display: block;
              object-fit: contain;
              right: -400;
              z-index: -100;
              top: 10;
            "
          />
        </div>
      </div>
    </div>
  </body>
</html>
`;
}

export function templateSuratIzinRombongan(data: string) {
  const value = JSON.parse(data);

  return `<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <title>Surat Keterangan Santri Aktif</title>
  </head>

  <style>
    .page-break {
      page-break-before: always; /* untuk memulai di halaman baru */
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    table,
    th,
    td {
      border: 1px solid black;
    }
    th,
    td {
      font-size: 0.7rem;
      font-weight: normal;
      padding: 8px;
      text-align: left;
    }
  </style>
  <body>
    <div>
      <div>
        <div style="width: 100%; position: relative">
          <img
            src="/assets/kop.jpg"
            alt="kop surat"
            style="
              width: 100%;
              height: auto;
              display: block;
              object-fit: contain;
            "
          />
        </div>
      </div>

      <div style="text-align: center">
        <h1
          style="
            font-weight: bold;
            font-size: 0.75rem;
            text-decoration: underline;
            margin-bottom: 8px;
          "
        >
          SURAT IZIN ROMBONGAN
        </h1>
        <p style="font-size: 0.75rem; margin: 0">
          Nomor : ${value.nomenclature}
        </p>
      </div>

      <div style="padding: 0 52px">
        <div>
          <p style="font-size: 0.7rem">
            Yang bertandatangan dibawah ini Pimpinan Umum Pondok Pesantren
            Miftahul Huda Al-Faqih. Memberikan izin kepada :
          </p>

          <div
            style="
              display: flex;
              align-items: center;
              flex-direction: row;
              margin: 4px 0;
            "
          >
            <p style="margin: 0; font-size: 0.7rem">
              Ketua Rombongan
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
            <p style="margin: 0; font-size: 0.7rem">
              : ${value.nama}
            </p>
          </div>

          <div
            style="
              display: flex;
              align-items: center;
              flex-direction: row;
              margin: 4px 0;
            "
          >
            <p style="margin: 0; font-size: 0.7rem">
              Kelas
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
            <p style="margin: 0; font-size: 0.7rem">: ${value.kelas}</p>
          </div>

          <div
            style="
              display: flex;
              align-items: center;
              flex-direction: row;
              margin: 4px 0;
            "
          >
            <p style="margin: 0; font-size: 0.7rem">
              Kepentingan
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
            <p style="margin: 0; font-size: 0.7rem">: ${value.kepentingan}</p>
          </div>

          <div
            style="
              display: flex;
              align-items: center;
              flex-direction: row;
              margin: 4px 0;
            "
          >
            <p style="margin: 0; font-size: 0.7rem">
              Angota Rombongan
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
            <p style="margin: 0; font-size: 0.7rem">: Terlampir</p>
          </div>
        </div>

        <div style="margin-top: 16px; text-align: justify">
          <p style="font-size: 0.7rem">
            Untuk bisa mengikuti kegiatan di luar komplek Pondok Pesantren
            Miftahul Huda Al-Faqih. Sesuai dengan kepentingan dan durasi yang
            telah di tentukan
          </p>
        </div>
      </div>
      <div
        style="
          display: flex;
          align-items: center;
          flex-direction: row;
          padding: 0 52px;
          margin: 0;
        "
      >
        <p style="margin: 0; font-size: 0.7rem; text-align: justify">
          Demikian surat keterangan ini dibuat untuk digunakan sebagaimana
          mestinya.
        </p>
      </div>

      <div
        style="
          position: relative;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          margin-top: 100px;
          padding: 0 52px;
        "
      >
        <div style="display: flex; align-items: center">
          <p style="margin: 0; font-size: 0.7rem; text-align: center">
            Tasikmalaya, ${formatted}
          </p>
          <p style="margin: 0; font-size: 0.7rem">
            Pimpinan Umum Pondok Pesantren
          </p>
          <p style="margin: 0; font-size: 0.7rem">Miftahul Huda Al-Faqih</p>
          <br /><br /><br />
          <p style="margin: 0; font-size: 0.7rem">
            <strong>KH. Dudung Abdullah Faqih</strong>
          </p>
        </div>

        <div style="width: 100%; position: absolute">
          <img
            src="/assets/tanda.png"
            alt="kop surat"
            style="
              width: 40%;
              height: auto;
              display: block;
              object-fit: contain;
              right: -320;
              z-index: -100;
              top: 10;
            "
          />
        </div>

        <div style="width: 100%; position: absolute">
          <img
            src="/assets/tangan.png"
            alt="kop surat"
            style="
              width: 30%;
              height: auto;
              display: block;
              object-fit: contain;
              right: -400;
              z-index: -100;
              top: 10;
            "
          />
        </div>
      </div>

      <p><br /></p>
      <p><br /></p>
      <p><br /></p>
      <p><br /></p>

      <div style="margin-top: -48px">
        <div style="width: 100%; position: relative; background: red">
          <img
            src="/assets/kop.jpg"
            alt="kop surat"
            style="
              width: 100%;
              height: auto;
              display: block;
              object-fit: contain;
            "
          />
        </div>

        <div style="margin-top: 24px">
          <table
            style="width: 100%; border-collapse: collapse; font-size: 0.7rem"
          >
            <thead>
              <tr>
                <th
                  style="
                    width: 5%;
                    border: 1px solid black;
                    text-align: left;
                    padding: 4px;
                  "
                >
                  NO
                </th>
                <th
                  style="
                    width: 50%;
                    border: 1px solid black;
                    text-align: left;
                    padding: 4px;
                  "
                >
                  Nama Anggota Rombongan
                </th>
                <th
                  style="
                    width: 20%;
                    border: 1px solid black;
                    text-align: left;
                    padding: 4px;
                  "
                >
                  Kelas
                </th>
                <th
                  style="
                    width: 25%;
                    border: 1px solid black;
                    text-align: left;
                    padding: 4px;
                  "
                >
                  Asrama
                </th>
              </tr>
            </thead>
            <tbody>
              ${value.anggota
                .map(
                  (data: any, i: number) => `
              <tr>
                <td
                  style="
                    width: 5%;
                    border: 1px solid black;
                    text-align: left;
                    padding: 4px;
                  "
                >
                  ${i + 1}
                </td>
                <td
                  style="
                    width: 50%;
                    border: 1px solid black;
                    text-align: left;
                    padding: 4px;
                  "
                >
                  ${data.nama}
                </td>
                <td
                  style="
                    width: 20%;
                    border: 1px solid black;
                    text-align: left;
                    padding: 4px;
                  "
                >${data.kelas}</td>
                <td
                  style="
                    width: 25%;
                    border: 1px solid black;
                    text-align: left;
                    padding: 4px;
                  "
                >${data.asrama}</td>
              </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </body>
</html>
`;
}
