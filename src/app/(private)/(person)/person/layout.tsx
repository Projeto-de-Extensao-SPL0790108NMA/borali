import { Sidebar } from "@/components/layout/sidebar";

export default function PersonLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  return (
    <div className="flex h-screen w-full font-poppins">
      <Sidebar />
      <main className="flex-1 overflow-auto font-poppins">{children}</main>
    </div>
  );
}
