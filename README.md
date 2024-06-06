rules_version = '2';

## // Permitir leituras e escritas somente para usuários autenticados

service cloud.firestore {
match /databases/{database}/documents {
match /{document=\*\*} {
allow read, write: if request.auth != null;
}
}
}

## // Garantir que cada usuário possa acessar apenas seus próprios dados

rules_version = '2';

service cloud.firestore {
match /databases/{database}/documents {
match /users/{userId} {
allow read, write: if request.auth != null && request.auth.uid == userId;
}
}
}
