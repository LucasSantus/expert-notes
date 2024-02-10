import { Fragment, PropsWithChildren } from "react";
import { Toaster } from "sonner";

interface ProvidersProps extends PropsWithChildren {}

export function Providers({ children }: ProvidersProps): JSX.Element {
  return (
    <Fragment>
      {children}
      <Toaster richColors />
    </Fragment>
  );
}
