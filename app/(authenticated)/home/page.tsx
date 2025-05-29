
import React from "react";

const HomePage = () => {
    

    // const handleGoToProfile = () => {
    //     router.push("/profile");
    // };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <h1 className="text-3xl font-bold mb-4">Bem-vindo ao Inbazz!</h1>
            <p className="mb-6 text-gray-600">
                Você está logado. Explore o app ou acesse seu perfil.
            </p>
            {/* <Button onClick={handleGoToProfile}>Ir para meu perfil</Button> */}
        </main>
    );
};

export default HomePage;