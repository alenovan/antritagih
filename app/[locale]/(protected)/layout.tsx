import LayoutProvider from "@/providers/layout.provider";
import LayoutContentProvider from "@/providers/content.provider";
import DashCodeSidebar from "@/components/partials/sidebar";
import DashCodeFooter from "@/components/partials/footer";
import DashCodeHeader from "@/components/partials/header";
import { auth } from "@/lib/auth";
import { redirect } from "@/components/navigation";
import { ConfirmationDialogProvider } from "@/components/ui/site/confirmation-dialog";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  if (!session) {
    redirect({ href: "/", locale: "en" });
  }
  return (
    <LayoutProvider>
      <DashCodeHeader />
      <DashCodeSidebar />
      <LayoutContentProvider>
        <ConfirmationDialogProvider>{children}</ConfirmationDialogProvider>
      </LayoutContentProvider>
      <DashCodeFooter />
    </LayoutProvider>
  );
};

export default layout;
