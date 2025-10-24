import Logo from '@/components/template/Logo'
import { useThemeStore } from '@/store/themeStore'
import appConfig from '@/configs/app.config'
import { Link } from 'react-router-dom'
import type { Mode } from '@/@types/theme'

const HeaderLogo = ({ mode }: { mode?: Mode }) => {

    return (
        <Link to={appConfig.authenticatedEntryPath}>
            <Link to="/">
                <img className="h-8 w-[155px]" src="/logo.png" alt="Logo" />
            </Link>
        </Link>
    )
}

export default HeaderLogo
