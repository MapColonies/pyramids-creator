# Map Colonies pyramids creator service

Based on Map Colonies "work-standard" repo (ts)

### usage:

1. copy the template files to new service repository.
1. run `npm install `.
1. run `npm rebuild husky` to configure commit messages linting.
1. add the required logic for the new service:
   - to add new routes: create an express router and connect it to express server in ServerBuilder registerControllers function. when adding handler to the router make sure to add "validate" middleware from 'openapi-validator-middleware' for request validation.
   - modify the global error handler in the middleware folder to return better error responses and catch the errors before the global handler (currently it returns empty 500 response )
1. run `npm run confd` to generate config file from confd
1. define environment variables (see `.env.example`)
1. run `npm start`

### usage notes:

1. when importing external dependencies from DI (such as McLogger) in class constructor the following decorator must be used to retrieve instance:

```typescript
@inject(delay(() => <injection token>)) <variable definition>
```

usage example:

```typescript
public constructor(
    @inject(delay(() => MCLogger)) private readonly logger: MCLogger) {
  }
```
