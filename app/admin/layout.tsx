export const metadata = {
  title: "Admin | Kalajulas Xpress",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-layout">
      <style>{`
        .admin-layout header,
        .admin-layout footer,
        .admin-layout .floating-departure { display: none !important; }
        .admin-layout main { padding-top: 0 !important; }
      `}</style>
      {children}
    </div>
  );
}
