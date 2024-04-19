import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export function buildPhotoViewCssLoader(isDev: boolean) {
    return {
        test: /\.css$/,
        include: /react-photo-view/, 
        use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader',
                options: {
                    modules: false,
                },
            },
        ],
    };
}