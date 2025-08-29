import { useState } from 'react';

// material-ui
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Box,
    Button,
    Chip,
    Grid,
    Avatar,
    Divider,
    Rating,
    IconButton,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
    ButtonGroup
} from '@mui/material';
import { styled } from '@mui/material/styles';

// assets
import WifiIcon from '@mui/icons-material/Wifi';
import PhoneIcon from '@mui/icons-material/Phone';
import SmsIcon from '@mui/icons-material/Sms';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// ==============================|| PACKAGE CARD ||============================== //

const StyledCard = styled(Card)(({ theme, provider }) => ({
    position: 'relative',
    overflow: 'visible',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: theme.shadows[8]
    },
    border: `2px solid ${getProviderColor(provider)}`,
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: `linear-gradient(90deg, ${getProviderColor(provider)}, ${getProviderColor(provider)}80)`
    }
}));

function getProviderColor(provider) {
    const colors = {
        'zong': '#ff6b35',
        'telenor': '#ffd700',
        'jazz': '#e74c3c',
        'ufone': '#3498db'
    };
    return colors[provider] || '#666';
}

const PackageCard = ({ isLoading }) => {
    const [favorites, setFavorites] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProvider, setSelectedProvider] = useState('zong');

    const packages = [
        {
            id: 1,
            name: 'Zong Super 4G',
            provider: 'zong',
            price: 999,
            duration: '30 days',
            data: '50 GB',
            minutes: '1000',
            sms: '1000',
            features: ['4G LTE', 'Night Binge', 'Social Media Free'],
            rating: 4.5,
            subscribers: '2.5M+',
            popular: true
        },
        {
            id: 2,
            name: 'Telenor Smart Bundle',
            provider: 'telenor',
            price: 799,
            duration: '30 days',
            data: '30 GB',
            minutes: '800',
            sms: '800',
            features: ['4G LTE', 'WhatsApp Free', 'YouTube Free'],
            rating: 4.3,
            subscribers: '1.8M+',
            popular: false
        },
        {
            id: 3,
            name: 'Jazz Super 4G',
            provider: 'jazz',
            price: 899,
            duration: '30 days',
            data: '40 GB',
            minutes: '1200',
            sms: '1200',
            features: ['4G LTE', 'Facebook Free', 'Instagram Free'],
            rating: 4.4,
            subscribers: '2.1M+',
            popular: true
        },
        {
            id: 4,
            name: 'Ufone Power Pack',
            provider: 'ufone',
            price: 699,
            duration: '30 days',
            data: '25 GB',
            minutes: '600',
            sms: '600',
            features: ['4G LTE', 'TikTok Free', 'Snapchat Free'],
            rating: 4.2,
            subscribers: '1.2M+',
            popular: false
        }
    ];

    const handleFavorite = (packageId) => {
        setFavorites(prev => 
            prev.includes(packageId) 
                ? prev.filter(id => id !== packageId)
                : [...prev, packageId]
        );
    };

    const handlePurchase = (pkg) => {
        console.log('Purchasing package:', pkg.name);
        // Add purchase logic here
    };

    if (isLoading) {
        return <div>Loading packages...</div>;
    }

    return (
        <>
            <Card>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        Available Packages
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                        Compare and choose the best mobile package for your needs
                    </Typography>
                    
                    <Box display="flex" justifyContent="flex-end" mb={2}>
                        <Button variant="outlined" color="secondary" onClick={() => setModalOpen(true)}>
                            Data Packages
                        </Button>
                    </Box>

                    <Grid container spacing={3} sx={{ mt: 2 }}>
                        {packages.map((pkg) => (
                            <Grid item xs={12} sm={6} lg={3} key={pkg.id}>
                                <StyledCard provider={pkg.provider}>
                                    <CardContent>
                                        <Box display="flex" justifyContent="flex-end" alignItems="flex-start" mb={2}>
                                            <Box>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleFavorite(pkg.id)}
                                                    color={favorites.includes(pkg.id) ? 'error' : 'default'}
                                                >
                                                    {favorites.includes(pkg.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                                                </IconButton>
                                                {pkg.popular && (
                                                    <Chip 
                                                        label="Popular" 
                                                        size="small" 
                                                        color="secondary" 
                                                        sx={{ ml: 1 }}
                                                    />
                                                )}
                                            </Box>
                                        </Box>
                                        <Typography variant="h6" gutterBottom>
                                            {pkg.name}
                                        </Typography>
                                        <Box display="flex" alignItems="center" mb={1}>
                                            <Rating value={pkg.rating} readOnly size="small" />
                                            <Typography variant="body2" color="textSecondary" sx={{ ml: 1 }}>
                                                ({pkg.subscribers})
                                            </Typography>
                                        </Box>
                                        <Typography variant="h4" color="primary" gutterBottom>
                                            Rs. {pkg.price}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" gutterBottom>
                                            {pkg.duration}
                                        </Typography>
                                        <Divider sx={{ my: 2 }} />
                                        <Box display="flex" alignItems="center" mb={1}>
                                            <WifiIcon color="primary" sx={{ mr: 1 }} />
                                            <Typography variant="body2">
                                                {pkg.data} Data
                                            </Typography>
                                        </Box>
                                        <Box display="flex" alignItems="center" mb={1}>
                                            <PhoneIcon color="primary" sx={{ mr: 1 }} />
                                            <Typography variant="body2">
                                                {pkg.minutes} Minutes
                                            </Typography>
                                        </Box>
                                        <Box display="flex" alignItems="center" mb={2}>
                                            <SmsIcon color="primary" sx={{ mr: 1 }} />
                                            <Typography variant="body2">
                                                {pkg.sms} SMS
                                            </Typography>
                                        </Box>
                                        <Box mb={2}>
                                            {pkg.features.map((feature, index) => (
                                                <Chip
                                                    key={index}
                                                    label={feature}
                                                    size="small"
                                                    variant="outlined"
                                                    sx={{ mr: 0.5, mb: 0.5 }}
                                                />
                                            ))}
                                        </Box>
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            startIcon={<ShoppingCartIcon />}
                                            onClick={() => handlePurchase(pkg)}
                                            sx={{
                                                background: `linear-gradient(45deg, ${getProviderColor(pkg.provider)}, ${getProviderColor(pkg.provider)}80)`,
                                                '&:hover': {
                                                    background: `linear-gradient(45deg, ${getProviderColor(pkg.provider)}80, ${getProviderColor(pkg.provider)})`
                                                }
                                            }}
                                        >
                                            Purchase Package
                                        </Button>
                                    </CardContent>
                                </StyledCard>
                            </Grid>
                        ))}
                    </Grid>
                </CardContent>
            </Card>

            {/* Modal for provider selection and data display */}
            <Dialog open={modalOpen} onClose={() => setModalOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle>Select Provider</DialogTitle>
                <DialogContent>
                    <Box display="flex" justifyContent="center" mb={2}>
                        <ButtonGroup variant="contained">
                            <Button onClick={() => setSelectedProvider('zong')} color={selectedProvider === 'zong' ? 'primary' : 'inherit'}>Zong</Button>
                            <Button onClick={() => setSelectedProvider('telenor')} color={selectedProvider === 'telenor' ? 'warning' : 'inherit'}>Telenor</Button>
                            <Button onClick={() => setSelectedProvider('jazz')} color={selectedProvider === 'jazz' ? 'error' : 'inherit'}>Jazz</Button>
                            <Button onClick={() => setSelectedProvider('ufone')} color={selectedProvider === 'ufone' ? 'info' : 'inherit'}>Ufone</Button>
                        </ButtonGroup>
                    </Box>
                    <Grid container spacing={3} justifyContent="center">
                        {packages.filter(pkg => pkg.provider === selectedProvider).map((pkg) => (
                            <Grid item xs={12} sm={8} md={6} key={pkg.id}>
                                <StyledCard provider={pkg.provider}>
                                    <CardContent>
                                        <Box display="flex" justifyContent="flex-end" alignItems="flex-start" mb={2}>
                                            <Box>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleFavorite(pkg.id)}
                                                    color={favorites.includes(pkg.id) ? 'error' : 'default'}
                                                >
                                                    {favorites.includes(pkg.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                                                </IconButton>
                                                {pkg.popular && (
                                                    <Chip 
                                                        label="Popular" 
                                                        size="small" 
                                                        color="secondary" 
                                                        sx={{ ml: 1 }}
                                                    />
                                                )}
                                            </Box>
                                        </Box>
                                        <Typography variant="h6" gutterBottom>
                                            {pkg.name}
                                        </Typography>
                                        <Box display="flex" alignItems="center" mb={1}>
                                            <Rating value={pkg.rating} readOnly size="small" />
                                            <Typography variant="body2" color="textSecondary" sx={{ ml: 1 }}>
                                                ({pkg.subscribers})
                                            </Typography>
                                        </Box>
                                        <Typography variant="h4" color="primary" gutterBottom>
                                            Rs. {pkg.price}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" gutterBottom>
                                            {pkg.duration}
                                        </Typography>
                                        <Divider sx={{ my: 2 }} />
                                        <Box display="flex" alignItems="center" mb={1}>
                                            <WifiIcon color="primary" sx={{ mr: 1 }} />
                                            <Typography variant="body2">
                                                {pkg.data} Data
                                            </Typography>
                                        </Box>
                                        <Box display="flex" alignItems="center" mb={1}>
                                            <PhoneIcon color="primary" sx={{ mr: 1 }} />
                                            <Typography variant="body2">
                                                {pkg.minutes} Minutes
                                            </Typography>
                                        </Box>
                                        <Box display="flex" alignItems="center" mb={2}>
                                            <SmsIcon color="primary" sx={{ mr: 1 }} />
                                            <Typography variant="body2">
                                                {pkg.sms} SMS
                                            </Typography>
                                        </Box>
                                        <Box mb={2}>
                                            {pkg.features.map((feature, index) => (
                                                <Chip
                                                    key={index}
                                                    label={feature}
                                                    size="small"
                                                    variant="outlined"
                                                    sx={{ mr: 0.5, mb: 0.5 }}
                                                />
                                            ))}
                                        </Box>
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            startIcon={<ShoppingCartIcon />}
                                            onClick={() => handlePurchase(pkg)}
                                            sx={{
                                                background: `linear-gradient(45deg, ${getProviderColor(pkg.provider)}, ${getProviderColor(pkg.provider)}80)`,
                                                '&:hover': {
                                                    background: `linear-gradient(45deg, ${getProviderColor(pkg.provider)}80, ${getProviderColor(pkg.provider)})`
                                                }
                                            }}
                                        >
                                            Purchase Package
                                        </Button>
                                    </CardContent>
                                </StyledCard>
                            </Grid>
                        ))}
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default PackageCard; 