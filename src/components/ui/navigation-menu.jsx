import { useState, useEffect, useRef, createContext, useContext } from "react";
import { cn } from "@/lib/utils";

const NavigationMenuContext = createContext(null);

function useNavigationMenu() {
  const context = useContext(NavigationMenuContext);
  if (!context) {
    throw new Error("useNavigationMenu must be used within NavigationMenuRoot");
  }
  return context;
}

export function NavigationMenu({ children }) {
  const [openMenuId, setOpenMenuId] = useState(null);
  const refs = useRef({});

  const registerRef = (id, ref) => {
    refs.current[id] = ref;
  };

  useEffect(() => {
    function handleClickOutside(e) {
      const clickedInsideAny = Object.values(refs.current).some(
        (ref) => ref && ref.contains(e.target)
      );
      if (!clickedInsideAny) {
        setOpenMenuId(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <NavigationMenuContext.Provider value={{ openMenuId, setOpenMenuId, registerRef }}>
      <nav className="relative flex items-center gap-6">{children}</nav>
    </NavigationMenuContext.Provider>
  );
}

export function NavigationMenuItem({ children }) {
  return <div className="relative">{children}</div>;
}

export function NavigationMenuTrigger({ id, children }) {
  const { openMenuId, setOpenMenuId } = useNavigationMenu();
  const isOpen = openMenuId === id;

  return (
    <button
      onClick={() => setOpenMenuId(isOpen ? null : id)}
      className={cn(
        "uppercase text-xs text-primary/80 font-medium py-7 border-b-4 transition-colors",
        isOpen ? "border-b-primary" : "border-b-transparent hover:border-b-primary"
      )}
    >
      {children}
    </button>
  );
}

export function NavigationMenuContent({ id, children, className }) {
  const { openMenuId, registerRef } = useNavigationMenu();
  const ref = useRef(null);

  useEffect(() => {
    registerRef(id, ref.current);
  }, [id, registerRef]);

  if (openMenuId !== id) return null;

  return (
    <div
      ref={ref}
      className={cn(
        "absolute top-full left-0 z-50 bg-white min-w-48",
        className
      )}
    >
      {children}
    </div>
  );
}
