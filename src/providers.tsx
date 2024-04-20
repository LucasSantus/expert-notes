import { Fragment, PropsWithChildren } from "react";
import { Toaster } from "sonner";

interface ProvidersProps extends PropsWithChildren {}

export function Providers({ children }: ProvidersProps): JSX.Element {
  return (
    <Fragment>
      {children}
      <Toaster duration={4000} richColors closeButton visibleToasts={9} />
    </Fragment>
  );
}
