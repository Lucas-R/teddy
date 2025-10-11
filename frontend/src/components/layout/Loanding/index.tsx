import brand from "@/assets/images/brands/brand.png";

export default function Loading() {
    return (
        <div className="fixed top-0 left-0 z-50 flex flex-col items-center justify-center gap-6 w-full h-screen bg-white/50 backdrop-blur-sm">
            <img 
                src={brand} 
                alt="Loading" 
                className="w-40 animate-pulse"
            />
            <p> Carregando... </p>
        </div>
    )
}