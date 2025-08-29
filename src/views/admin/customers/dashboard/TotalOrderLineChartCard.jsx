import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import ButtonGroup from '@mui/material/ButtonGroup';

// third-party
import Chart from 'react-apexcharts';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonTotalOrderCard from 'ui-component/cards/Skeleton/EarningCard';
import { ThemeMode } from 'config';

import ChartDataMonth from './chart-data/total-order-month-line-chart';
import ChartDataYear from './chart-data/total-order-year-line-chart';

// assets
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { IconDeviceMobile } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

// ==============================|| DASHBOARD - TOTAL ORDER LINE CHART CARD ||============================== //

const TotalOrderLineChartCard = ({ isLoading, onClick }) => {
    const theme = useTheme();

    const [timeValue, setTimeValue] = React.useState(false);
    const handleChangeTime = () => {
        setTimeValue(newValue);
    };

    const [openModal, setOpenModal] = React.useState(false);
    const [selectedNetwork, setSelectedNetwork] = React.useState('zong');

    const navigate = useNavigate();

    // Sample packages array for demonstration
    const packages = [
      { id: 1, name: 'Zong Super 4G', provider: 'zong', price: 999 },
      { id: 2, name: 'Telenor Smart Bundle', provider: 'telenor', price: 799 },
      { id: 3, name: 'Jazz Super 4G', provider: 'jazz', price: 899 },
      { id: 4, name: 'Ufone Power Pack', provider: 'ufone', price: 699 }
    ];

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    const networks = ['zong', 'telenor', 'ufone', 'jazz'];

    return (
        <>
            {isLoading ? (
                <SkeletonTotalOrderCard />
            ) : (
                <MainCard
                    border={false}
                    content={false}
                    sx={{
                        bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.dark' : 'primary.dark',
                        color: '#fff',
                        overflow: 'hidden',
                        position: 'relative',
                        '&>div': {
                            position: 'relative',
                            zIndex: 5
                        },
                        '&:after': {
                            content: '""',
                            position: 'absolute',
                            width: 210,
                            height: 210,
                            background:
                                theme.palette.mode === ThemeMode.DARK
                                    ? `linear-gradient(210.04deg, ${theme.palette.primary.dark} -50.94%, rgba(144, 202, 249, 0) 95.49%)`
                                    : theme.palette.primary[800],
                            borderRadius: '50%',
                            top: { xs: -105, sm: -85 },
                            right: { xs: -140, sm: -95 }
                        },
                        '&:before': {
                            content: '""',
                            position: 'absolute',
                            width: 210,
                            height: 210,
                            background:
                                theme.palette.mode === ThemeMode.DARK
                                    ? `linear-gradient(140.9deg, ${theme.palette.primary.dark} -14.02%, rgba(144, 202, 249, 0) 85.50%)`
                                    : theme.palette.primary[800],
                            borderRadius: '50%',
                            top: { xs: -155, sm: -125 },
                            right: { xs: -70, sm: -15 },
                            opacity: 0.5
                        }
                    }}
                >
                    <Box sx={{ p: 2.25 }}>
                        <Grid container direction="column">
                            <Grid item>
                                <Grid container justifyContent="space-between">
                                    <Grid item>
                                        <Avatar
                                            variant="rounded"
                                            sx={{
                                                ...theme.typography.commonAvatar,
                                                ...theme.typography.largeAvatar,
                                                bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.main' : 'primary.800',
                                                color: '#fff',
                                                mt: 1
                                            }}
                                        >
                                            <IconDeviceMobile fontSize="inherit" />
                                        </Avatar>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item sx={{ mb: 0.75 }}>
                                <Grid container alignItems="center">
                                    <Grid item xs={12}>
                                        {/* Amount */}
                                        <Typography
                                            sx={{
                                                fontSize: '2.125rem',
                                                fontWeight: 700,
                                                mb: 0.5
                                            }}
                                        >
                                            $961
                                        </Typography>
                                        {/* Data Packages label */}
                                        <Typography
                                            variant="h6"
                                            fontWeight={700}
                                            sx={{
                                                color: theme.palette.mode === ThemeMode.DARK ? 'text.secondary' : 'primary.200',
                                                mb: 1
                                            }}
                                        >
                                            Data Packages
                                        </Typography>
                                        {/* Description */}
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                opacity: 0.8,
                                                color: theme.palette.mode === ThemeMode.DARK ? 'text.secondary' : 'primary.200',
                                                mb: 2
                                            }}
                                        >
                                            Buy or compare mobile data packages
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            sx={{
                                                fontWeight: 700,
                                                borderRadius: 2,
                                                boxShadow: 3,
                                                bgcolor: 'primary.main',
                                                color: '#fff',
                                                '&:hover': { bgcolor: 'primary.dark' }
                                            }}
                                            onClick={() => navigate('/dashboard/data-packages')}
                                        >
                                            Data Packages
                                        </Button>
                                    </Grid>
                             
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>

                    {/* Modal for network selection and packages */}
                    {/* Remove the Dialog/modal code completely */}
                </MainCard>
            )}
        </>
    );
};

TotalOrderLineChartCard.propTypes = {
    isLoading: PropTypes.bool
};

export default TotalOrderLineChartCard;
