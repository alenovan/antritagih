import { AuthorizedComponent } from "./authorized-component";
import { Menu } from "@/lib/menus";

export default function AuthorizedNavMenu({
  resource,
  restricted,
  children,
}: {
  resource: string;
  restricted: boolean;
  children: React.ReactNode;
}) {
  if (restricted) {
    return (
      <AuthorizedComponent resource={resource} action="read">
        {children}
      </AuthorizedComponent>
    );
  }

  return <>{children}</>;
}
