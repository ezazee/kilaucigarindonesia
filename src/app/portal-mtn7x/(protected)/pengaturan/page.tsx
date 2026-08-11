import { prisma } from "@/lib/prisma";
import { saveSettings, changePassword } from "./actions";
import { PageHeader, Panel, inputClass, labelClass } from "../_components/ui";
import { SubmitButton } from "../_components/SubmitButton";
import WaTemplateField from "./WaTemplateField";

interface GeneralSettings {
  siteTitle?: string;
  siteDescription?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  youtubeUrl?: string;
  whatsappNumber?: string;
  contactEmail?: string;
  officeLocation?: string;
  footerDescriptionId?: string;
  footerDescriptionEn?: string;
  operatingHoursId?: string;
  operatingHoursEn?: string;
  waProductTemplateId?: string;
  waProductTemplateEn?: string;
  waContactTemplateId?: string;
  waContactTemplateEn?: string;
}

const DEFAULT_PRODUCT_TEMPLATE_ID =
  "Halo Kilau Cigar Indonesia, saya mau pesan:\n\n*{product}* — {packaging}\nJumlah: {qty}\nTotal: {total}\n\nMohon informasi ketersediaan dan ongkir. Terima kasih.";
const DEFAULT_PRODUCT_TEMPLATE_EN =
  "Hello Kilau Cigar Indonesia, I'd like to order:\n\n*{product}* — {packaging}\nQty: {qty}\nTotal: {total}\n\nPlease provide availability and shipping cost. Thank you.";
const DEFAULT_CONTACT_TEMPLATE_ID =
  "Halo Kilau Cigar Indonesia,\n\nNama Pemesan: {name}\nEmail: {email}\nProduk:\n{products}\n\nDetail Pesanan:\n{message}\n\nMohon informasi ketersediaan dan ongkir. Terima kasih.";
const DEFAULT_CONTACT_TEMPLATE_EN =
  "Hello Kilau Cigar Indonesia,\n\nCustomer Name: {name}\nEmail: {email}\nProducts:\n{products}\n\nOrder Details:\n{message}\n\nPlease provide availability and shipping cost. Thank you.";

const PRODUCT_EXAMPLE = { product: "Toro Serie F", packaging: "Wooden Box (20pcs)", qty: "2", total: "Rp 16.000.000" };
const CONTACT_EXAMPLE = {
  name: "Budi Santoso",
  email: "budi@email.com",
  products: "  - Toro Serie F\n  - Gran Robusto",
  message: "Mau pesan 2 box, kirim ke Jakarta Selatan.",
};

export default async function PengaturanPage() {
  const setting = await prisma.setting.findUnique({ where: { key: "general" } });
  const value = (setting?.value as GeneralSettings) ?? {};

  return (
    <div>
      <PageHeader title="Pengaturan" description="Metadata situs, kontak sosial, dan verifikasi SEO" />

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-5 items-start">
      <form action={saveSettings} className="space-y-5 min-w-0">
        <Panel title="Identitas Situs">
          <div className="space-y-4">
            <label className="block">
              <span className={labelClass}>Site Title</span>
              <input name="siteTitle" defaultValue={value.siteTitle} placeholder="Kilau Cigar Indonesia | Cerutu Premium & Eksklusif" className={inputClass} />
            </label>
            <label className="block">
              <span className={labelClass}>Site Description</span>
              <textarea name="siteDescription" defaultValue={value.siteDescription} rows={3} className={`${inputClass} resize-y`} />
            </label>
          </div>
        </Panel>

        <Panel title="Footer" action={<span className="text-xs text-zinc-500">Tampil di footer semua halaman</span>}>
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-5">
              <label className="block">
                <span className={labelClass}>Deskripsi Footer (Indonesia)</span>
                <textarea
                  name="footerDescriptionId"
                  defaultValue={value.footerDescriptionId}
                  rows={3}
                  placeholder="Kilau Cigar Indonesia menghadirkan pengalaman premium terbaik..."
                  className={`${inputClass} resize-y`}
                />
              </label>
              <label className="block">
                <span className={labelClass}>Deskripsi Footer (English)</span>
                <textarea
                  name="footerDescriptionEn"
                  defaultValue={value.footerDescriptionEn}
                  rows={3}
                  placeholder="Kilau Cigar Indonesia provides the ultimate premium experience for cigar aficionados worldwide..."
                  className={`${inputClass} resize-y`}
                />
              </label>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="block">
                <span className={labelClass}>Email Kontak</span>
                <input name="contactEmail" defaultValue={value.contactEmail} placeholder="info@kilaucigarindonesia.com" className={inputClass} />
              </label>
              <label className="block">
                <span className={labelClass}>Lokasi Kantor (footer)</span>
                <input name="officeLocation" defaultValue={value.officeLocation} placeholder="Jakarta, Indonesia" className={inputClass} />
              </label>
            </div>
          </div>
        </Panel>

        <Panel title="Jam Operasional" action={<span className="text-xs text-zinc-500">Tampil di halaman Produk & Kontak</span>}>
          <div className="grid sm:grid-cols-2 gap-5">
            <label className="block">
              <span className={labelClass}>Estimasi Respons Order (Indonesia)</span>
              <input
                name="operatingHoursId"
                defaultValue={value.operatingHoursId}
                placeholder="Biasanya dibalas dalam 1 jam, pukul 09.00–21.00 WIB."
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className={labelClass}>Estimasi Respons Order (English)</span>
              <input
                name="operatingHoursEn"
                defaultValue={value.operatingHoursEn}
                placeholder="Usually replied within 1 hour, 09:00–21:00 WIB."
                className={inputClass}
              />
            </label>
          </div>
        </Panel>

        <Panel title="Template Pesan WhatsApp — Tombol Order Produk" action={<span className="text-xs text-zinc-500">{"{product} {packaging} {qty} {total}"}</span>}>
          <div className="grid sm:grid-cols-2 gap-5">
            <WaTemplateField
              name="waProductTemplateId"
              label="Template (Indonesia)"
              defaultValue={value.waProductTemplateId}
              placeholder={DEFAULT_PRODUCT_TEMPLATE_ID}
              example={PRODUCT_EXAMPLE}
            />
            <WaTemplateField
              name="waProductTemplateEn"
              label="Template (English)"
              defaultValue={value.waProductTemplateEn}
              placeholder={DEFAULT_PRODUCT_TEMPLATE_EN}
              example={PRODUCT_EXAMPLE}
            />
          </div>
        </Panel>

        <Panel title="Template Pesan WhatsApp — Form Kontak" action={<span className="text-xs text-zinc-500">{"{name} {email} {products} {message}"}</span>}>
          <div className="grid sm:grid-cols-2 gap-5">
            <WaTemplateField
              name="waContactTemplateId"
              label="Template (Indonesia)"
              defaultValue={value.waContactTemplateId}
              placeholder={DEFAULT_CONTACT_TEMPLATE_ID}
              example={CONTACT_EXAMPLE}
            />
            <WaTemplateField
              name="waContactTemplateEn"
              label="Template (English)"
              defaultValue={value.waContactTemplateEn}
              placeholder={DEFAULT_CONTACT_TEMPLATE_EN}
              example={CONTACT_EXAMPLE}
            />
          </div>
        </Panel>

        <Panel title="Kontak & Sosial">
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block">
              <span className={labelClass}>Nomor WhatsApp</span>
              <input name="whatsappNumber" defaultValue={value.whatsappNumber} placeholder="6281120078910" className={inputClass} />
            </label>
            <label className="block">
              <span className={labelClass}>Instagram URL</span>
              <input name="instagramUrl" defaultValue={value.instagramUrl} placeholder="https://instagram.com/kilaucigarindonesia" className={inputClass} />
            </label>
            <label className="block">
              <span className={labelClass}>Facebook URL</span>
              <input name="facebookUrl" defaultValue={value.facebookUrl} placeholder="https://facebook.com/kilaucigarindonesia" className={inputClass} />
            </label>
            <label className="block">
              <span className={labelClass}>YouTube URL</span>
              <input name="youtubeUrl" defaultValue={value.youtubeUrl} placeholder="https://youtube.com/@kilaucigarindonesia" className={inputClass} />
            </label>
          </div>
          <p className="mt-3 text-xs text-zinc-600">Kosongkan jika belum punya akun — ikon terkait tidak akan ditampilkan sebagai link aktif di footer.</p>
        </Panel>

        <SubmitButton pendingText="Menyimpan..." successMessage="Pengaturan berhasil disimpan">Simpan Pengaturan</SubmitButton>
      </form>

      <form action={changePassword} className="xl:sticky xl:top-8">
        <Panel title="Ganti Password" action={<span className="text-xs text-zinc-500">Akun kamu</span>}>
          <div className="space-y-4">
            <label className="block">
              <span className={labelClass}>Password Saat Ini</span>
              <input name="currentPassword" type="password" required className={inputClass} />
            </label>
            <label className="block">
              <span className={labelClass}>Password Baru</span>
              <input name="newPassword" type="password" required minLength={8} className={inputClass} />
            </label>
            <label className="block">
              <span className={labelClass}>Konfirmasi Password Baru</span>
              <input name="confirmPassword" type="password" required minLength={8} className={inputClass} />
            </label>
          </div>
          <p className="mt-3 text-xs text-zinc-600">Minimal 8 karakter.</p>
          <SubmitButton className="mt-4 w-full justify-center" pendingText="Mengganti..." successMessage="Password berhasil diganti">Ganti Password</SubmitButton>
        </Panel>
      </form>
      </div>
    </div>
  );
}
