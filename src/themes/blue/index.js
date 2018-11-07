import { createMuiTheme } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'
import blueGrey from '@material-ui/core/colors/blueGrey'

const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: blueGrey,
        contrastThreshold: 3,
    }
})

export default theme;