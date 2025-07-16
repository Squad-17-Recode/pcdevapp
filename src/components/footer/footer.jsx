import { NavLink } from "react-router-dom";

function Footer() {
    return (
        <footer>
            <div className="container text-center">
                <div className="footer-links mb-4">
                    <NavLink to="/sobre">Sobre</NavLink>
                    <NavLink to="/termos">Termos</NavLink>
                    <NavLink to="/privacidade">Privacidade</NavLink>
                    <NavLink to="/contato">Contato</NavLink>
                </div>
                <p className="copyright-text mb-0">© 2025 PCDev. Todos os direitos reservados.</p>
            </div>
        </footer>
    );

}

export default Footer;
