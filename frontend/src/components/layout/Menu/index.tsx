import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate, type FileRouteTypes } from "@tanstack/react-router"
import { useAuth } from "@/hooks/useAuth"
import Container from "@/components/layout/Container"

import brand from "@/assets/images/brands/brand.png"
import bars from "@/assets/icons/bars.png"
import arrowLeft from "@/assets/icons/circle-arrow-left.png"

interface NavProps {
    to: FileRouteTypes["to"],
    children: string,
    pathname: string
}

function Nav({ children, to, pathname }: NavProps) {
    return (
        <Link 
            to={to}
            className={`
                text-base font-normal 
                ${pathname === to && 'text-primary underline'}
                hover:text-primary hover:underline
            `}
        >
            { children }
        </Link>
    )
}

function NavAside({ children, to, pathname }: NavProps) {
    return (
        <Link 
            to={to}
            className={`
                flex items-center w-full h-11 text-base font-semibold mb-3 
                ${pathname === to && 'text-primary border-r-2 border-primary'}
                last:mb-0 hover:text-primary hover:border-r-2 hover:border-primary
            `}
        >
            { children }
        </Link>
    )
}

export default function Menu() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout, isAuthenticated } = useAuth();

    useEffect(() => {
        if(!isAuthenticated) navigate({ to: "/login" });
    }, [isAuthenticated]);

    useEffect(() => {
        setIsOpen(false);
    }, [pathname])

    function handleOpenMenu() {
        setIsOpen(true)
    }

    function handleCloseMenu() {
        setIsOpen(false)
    }

    return (
        <>
            <div className="relative w-full h-20 bg-white shadow shadow-black/10 lg:h-[100px]">
                <Container py="none" className="h-full flex items-center justify-between">
                    <div className="flex gap-4">
                        <button 
                            className="relative w-5 md:absolute md:left-6 top-1/2 md:-translate-y-1/2 md:w-6 2xl:left-[50px]"
                            onClick={handleOpenMenu}
                        >
                            <img src={bars} alt="Menu" />
                        </button>

                        <Link to="/">
                            <img    
                                src={brand}    
                                alt="Teddy open finance"
                                className="w-20 lg:w-25"
                            />
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center justify-center gap-8">
                        <Nav pathname={pathname} to="/clientes">Clientes</Nav>
                        <Nav pathname={pathname} to="/clientes/selecionados">Clientes selecionados</Nav>
                        <button onClick={logout}>Sair</button>
                    </div>

                    <p>Olá, <strong>{ user?.name }</strong></p>
                </Container>
            </div>

            <div className={`
                    fixed top-0 left-0 z-50 w-full h-screen duration-500 delay-200
                    ${isOpen ? "bg-black/50 backdrop-blur-sm pointer-events-auto" : "bg-transparent pointer-events-none"}
            `}>
                <div className={`
                    fixed top-0  w-full flex flex-col h-screen rounded-tr-2xl bg-offwhite duration-1000
                    ${isOpen ? "left-0" : "-left-full"}
                    sm:max-w-64
                `}>
                    <div className="relative w-full h-32 flex items-center justify-center border-b border-black/10">
                        <img    
                            src={brand}    
                            alt="Teddy open finance"
                            className="w-20 lg:w-25"
                        />

                        <button 
                            className="absolute bottom-0 right-0 translate-y-1/2 flex items-center justify-center w-11 h-11 bg-black rounded-full sm:translate-x-1/2"
                            onClick={handleCloseMenu}
                        >
                            <img 
                                src={arrowLeft} 
                                alt="Toggle menu"
                                className={`
                                    w-4 h-4 duration-500 delay-1000
                                    ${isOpen ? "rotate-0" : "rotate-180"}
                                `}
                            />
                        </button>
                    </div>
                    <div className="grow pt-10 pl-4 overflow-y-scroll no-scrollbar md:pl-6">
                        <NavAside pathname={pathname} to="/">Home</NavAside>
                        <NavAside pathname={pathname} to="/clientes">Clientes</NavAside>
                        <NavAside pathname={pathname} to="/clientes/selecionados">Clientes selecionados</NavAside>
                    </div>
                </div>
            </div>
        </>
    )
}