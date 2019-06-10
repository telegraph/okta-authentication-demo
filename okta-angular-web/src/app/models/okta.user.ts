/**
 * @export
 * @interface OktaUser
 *
 * This interface represents the union of possible known claims that are in an
 * ID Token or returned from the {baseURI}/api/v1/users/me response and depend on the
 * response_type and scope parameters in the authorize request
 */

export interface OktaUser {  
    id?: string,
    status?: string,
    created?: string,
    activated?: string,
    statusChanged?: string,
    lastLogin: string,
    lastUpdated: string,
    passwordChanged: string,
    profile:{  
       firstName: string,
       lastName: string,
       mobilePhone: string,
       secondEmail: string,
       login: string,
       email: string
    },
    credentials:{  
       password: object,
       emails: Array<Object>,
       recovery_question:{  
          question: string
       },
       provider:{  
          type: string,
          name: string
       }
    },
    _links:{  
       suspend:{  
          href: string,
          method: string
       },
       resetPassword:{  
          href: string,
          method: string
       },
       forgotPassword:{  
          href: string,
          method: string
       },
       expirePassword:{  
          href: string,
          method: string
       },
       changeRecoveryQuestion:{  
          href: string,
          method: string
       },
       self:{  
          href: string
       },
       changePassword:{  
          href: string,
          method: string
       },
       deactivate:{  
          href: string,
          method: string
       }
    }
 }