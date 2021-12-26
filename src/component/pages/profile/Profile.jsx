import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../../items/api"
import "./Profile.css"
import { Autocomplete, Avatar, Button, Container, CssBaseline, Divider, Grid, List, ListItem, ListItemText, Paper, TextField, ThemeProvider, Typography } from "@mui/material"
import { themeOption } from "../../ui/ThemeOptions"
import { Box } from "@mui/system"
import { AccountCircle, Edit } from "@mui/icons-material"


function Profile(props) {
    const { id } = props
    const [ editMode, setEditMode] = useState(false)
    const [ newName, setNewName ] = useState("")
    const { userId } = useParams()

    useEffect(() => {
        api.get(`getUserInfo/${id}`)
        .then((response) => {
            console.log(response.data)
            setNewName(response.data.username)
        })
    }, [id])

    const editInfo = () => {
        api.post("editUserInfo", {
            userId: id,
            name: newName,
        })
        setEditMode(false)
    }

    const theme = themeOption;
    return (
        <div className="profile-page">
            {editMode ?
                <ThemeProvider theme={theme}>
                    < Container elevation={8} component="main" maxWidth="xs" >
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <Edit />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                編集
                            </Typography>
                            <Box component="form" noValidate sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            autoComplete="given-name"
                                            name="Name"
                                            required
                                            fullWidth
                                            id="Name"
                                            label="ユーザーネーム"
                                            autoFocus
                                            value={newName}
                                            onChange={(e) => { setNewName(e.target.value) }}
                                        />
                                    </Grid>
                                    
                                </Grid>
                                <Button
                                    onClick={editInfo}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    決定
                                </Button>
                            </Box>
                        </Box>
                    </Container >
                </ThemeProvider >

                :
                <ThemeProvider theme={theme}>
                    < Container elevation={8} component="main" maxWidth="sm" >
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <AccountCircle />
                            </Avatar>
                            <Typography variant="h5" component="h1">
                                {newName}
                            </Typography>
                            <Box container sx={{ boxShadow: 3, width: "100%", p: 4, my: 4 }}>
                                <List>
                                    {Number(userId) === id ?
                                        <>
                                            <Divider />
                                            <Button
                                                onClick={() => { setEditMode(true) }}
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                sx={{ mt: 3, mb: 2 }}
                                            >
                                                プロフィールを編集する
                                            </Button>
                                        </>
                                        : null
                                    }
                                </List>
                            </Box>

                        </Box>
                    </Container>
                </ThemeProvider>

            }
            <ThemeProvider theme={theme}>
                < Container elevation={8} component="main" maxWidth="sm" >
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="h5" component="h1">
                            {newName}の投稿
                        </Typography>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>

    )
}
export default Profile