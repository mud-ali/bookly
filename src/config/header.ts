type linkInfo = {
    href: string,
    name: string
};

const headerConfig: {
   siteName: string,
   links: linkInfo[] 
} = {
    siteName: "Book.ly",
    links: [
        {
            href: "/",
            name: "Dashboard"
        }
    ]
};

export default headerConfig;