import { BrowserRouter } from 'react-router-dom'
import Theme from '@/components/template/Theme'
import Layout from '@/components/layouts'
import { AuthProvider } from '@/auth'
import Views from '@/views'
import './locales'
import AppProvider from './auth/AppProvider'


function App() {
    return (
        <div className="font-PoppinsRegular">
            <Theme>
                <BrowserRouter>
                    <AppProvider>
                        <AuthProvider>
                            <Layout>
                                <Views />
                            </Layout>
                        </AuthProvider>
                    </AppProvider>
                </BrowserRouter>
            </Theme>
        </div>
    )
}

export default App
