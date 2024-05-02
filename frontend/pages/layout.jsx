import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../components/CardComponent';



 export default function RootLayout(props) {
   return (
     <html lang="en">
       <body>
        <AppRouterCacheProvider options={{key : 'css'}}>
            <ThemeProvider theme={}>
                {props.children}
            </ThemeProvider>
        </AppRouterCacheProvider>
       </body>
     </html>
   );
 }