import React from "react";
import {NavLink} from "react-router-dom";

function Footer() {
    const handlePlaceholderClick = (e) => {
        e.preventDefault();
        console.log("Link não implementado.");
    };

    return (
        <footer>
            <div className="container text-center">

                <div className="footer-links mb-4">
                    <NavLink to="/sobre">Sobre</NavLink>
                    <a href="#" onClick={handlePlaceholderClick}>Termos</a>
                    <a href="#" onClick={handlePlaceholderClick}>Privacidade</a>
                    <a href="#" onClick={handlePlaceholderClick}>Contato</a>
                </div>
                <p className="copyright-text mb-0">© 2025 PCDev. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
    
}

export default Footer;