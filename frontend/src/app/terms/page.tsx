import LegalLayout from "@/components/LegalLayout";

export const metadata = { title: "Términos de servicio - Teko Social Manager" };

export default function TermsPage() {
  return (
    <LegalLayout title="Términos de servicio" updated="noviembre de 2026">
      <p className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-amber-200">
        Texto base pendiente de revisión legal. Puede cambiar antes de su versión definitiva.
      </p>
      <p>Al usar Teko Social Manager aceptas estos términos. La herramienta sirve para planificar, publicar y gestionar contenido, mensajes y comentarios de tus cuentas de redes sociales.</p>
      <section>
        <h2>Conexión con Meta, Facebook e Instagram</h2>
        <p>Para funcionar, la aplicación se conecta a tus Páginas de Facebook y cuentas de Instagram Business mediante el inicio de sesión de Meta. Tú decides qué cuentas conectas y puedes revocar el acceso en cualquier momento desde la configuración de Meta o solicitando la eliminación de tus datos.</p>
      </section>
      <section>
        <h2>Responsabilidad del contenido</h2>
        <p>Eres el único responsable del contenido que programas, publicas o envías a través de la aplicación, y de contar con los derechos necesarios sobre textos, imágenes y videos. Teko no revisa ni respalda ese contenido.</p>
      </section>
      <section>
        <h2>Políticas de Meta</h2>
        <p>Te comprometes a cumplir los Términos de la Plataforma de Meta, las Políticas para Desarrolladores, las Normas Comunitarias de Facebook e Instagram y las leyes aplicables. Meta puede limitar o suspender el acceso a sus servicios, y Teko no se responsabiliza por esas decisiones.</p>
      </section>
      <section>
        <h2>Disponibilidad del servicio</h2>
        <p>Procuramos mantener la aplicación disponible, pero se ofrece &quot;tal cual&quot;, sin garantía de funcionamiento ininterrumpido. Puede verse afectada por mantenimiento o por cambios y fallos en las API de Meta.</p>
      </section>
      <section>
        <h2>Privacidad y datos</h2>
        <p>El tratamiento de tus datos se describe en la <a href="/privacy">Política de privacidad</a>. Puedes solicitar su eliminación en <a href="/data-deletion">Eliminación de datos</a>.</p>
      </section>
      <section>
        <h2>Ley aplicable</h2>
        <p>Estos términos se rigen por las leyes de la República Dominicana, y cualquier controversia se someterá a los tribunales competentes de ese país.</p>
      </section>
      <section>
        <h2>Contacto</h2>
        <p><a href="mailto:boludotumblr@gmail.com">boludotumblr@gmail.com</a></p>
      </section>
    </LegalLayout>
  );
}
