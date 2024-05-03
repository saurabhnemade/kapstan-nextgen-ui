export const PageContainer = ({ children }: { children: React.ReactNode }) => (
        <div style={{ display: 'flex', flexGrow: 1, padding: 10 }}>
            {children}
        </div>
    );
