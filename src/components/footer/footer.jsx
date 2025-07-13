import { NavLink } from "react-router-dom";

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
                    <button type="button" onClick={handlePlaceholderClick}>Termos</button>
                    <button type="button" onClick={handlePlaceholderClick}>Privacidade</button>
                    <button type="button" onClick={handlePlaceholderClick}>Contato</button>
                </div>
                <p className="copyright-text mb-0">© 2025 PCDev. Todos os direitos reservados.</p>
            </div>
        </footer>
    );

}

export default Footer;
