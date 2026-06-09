import { forwardRef, useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { FormField } from "./FormField";

type Props = React.ComponentProps<typeof FormField>;

export const PasswordInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const [show, setShow] = useState(false);
  return (
    <FormField
      ref={ref}
      type={show ? "text" : "password"}
      icon={<Lock className="h-4 w-4" />}
      rightSlot={
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 transition"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      }
      {...props}
    />
  );
});
PasswordInput.displayName = "PasswordInput";
