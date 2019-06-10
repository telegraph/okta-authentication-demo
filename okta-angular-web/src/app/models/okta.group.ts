/**
 * @export
 * @interface OktaGroup
 *
 * GET {baseURI}/api/v1/users/me/groups returns an ARRAY<Object>.
 * Each group (Object) has the followed structure
 */

export interface OktaGroup{  
    id?: string,
    created?: string,
    lastUpdated?: string,
    lastMembershipUpdated?: string,
    objectClass: Array<string>,
    type?: string,
    profile?: {  
       name?: string,
       description?: string
    },
    _links?:{  
       logo: Array<Object>,
       users:{  
          href: string
       },
       apps:{  
          href: string
       }
    }
 }