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
        },
        {
            href: "/add",
            name: "Add Book"
        },
        {
            href: "/log",
            name: "View Your Reading Log"
        },
        {
            href: "/read",
            name: "Read a Book"
        }
    ]
};

export default headerConfig;