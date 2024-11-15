import { useState, useEffect } from 'react';

const ProductImage = ({ productId }) => {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const fetchImage = async () => {
            try {
                // Make a request to the backend to fetch the image
                const response = await fetch(`https://ecommerce-service-jscn.onrender.com/api/products/${productId}/image`);
                
                if (!response.ok) {
                    throw new Error('Image not found');
                }
                
                // Convert the response to a blob
                const imageBlob = await response.blob();
                
                // Create a URL for the image blob
                const imageObjectUrl = URL.createObjectURL(imageBlob);
                
                // Set the image URL in the state to display it
                setImageUrl(imageObjectUrl);
            } catch (error) {
                console.error('Error fetching the image:', error);
            }
        };

        fetchImage();
    }, [productId]);

    return (
        <div>
            {imageUrl ? (
                <img src={imageUrl} alt="Product" />
            ) : (
                <p>Loading image...</p>
            )}
        </div>
    );
};

export default ProductImage;
