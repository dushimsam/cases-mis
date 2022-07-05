db.createUser({
    user: 'admin',
    pwd: 'dushsam',
    roles: [
        {
            role: 'readWrite',
            db: 'case-management'
        }
    ]
})