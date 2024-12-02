import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { useQuery } from 'react-query'
import { Grid } from '@mui/material';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function Catalogo() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const { error, data } = useQuery({
        queryKey: ['repoData'],
        queryFn: () =>
            fetch('https://fakestoreapi.com/products').then((res) =>
                res.json().catch(() => []),
            ),
    })

    return (
        <Box sx={{ width: '100' }}>
            < Box sx={{
                borderBottom: 1, borderColor: 'divider', justifyContent: "center", display: "flex"
            }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Computadores" {...a11yProps(0)} />
                    <Tab label="Ropa y Accesorios" {...a11yProps(1)} />
                    <Tab label="Hogar y Decoración" {...a11yProps(2)} />
                </Tabs>
            </Box >
            <CustomTabPanel value={value} index={0}>
                <Grid container spacing={1}>
                    {data && Array.isArray(data) ? (
                        data.map((row) => (
                            <Grid item lg={2} key={row.id} >
                                <Card sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    textAlign: "center",
                                    height: "100%", // Ajusta la altura
                                    margin: "auto",
                                }}>
                                    <CardActionArea sx={{ height: "100%" }}>
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={row.image}
                                            alt="green iguana"
                                            sx={{
                                                objectFit: "cover",  // Llena el contenedor sin deformarse
                                                width: "100%",       // Asegura que ocupe todo el ancho
                                            }}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {row.title}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                                {row.price}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <Typography>No hay productos disponibles.</Typography>
                    )}

                </Grid>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                Ropa y Accesorios
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                Hogar y Decoración
            </CustomTabPanel>
        </Box >
    );
}
