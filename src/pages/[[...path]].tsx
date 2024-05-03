export default function IndexPage() {
    return <></>;
}

export const getServerSideProps = () => ({
        redirect: {
            destination: '/application/1',
            status: 301,
        },
    });
