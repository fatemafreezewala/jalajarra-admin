import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
//import {getLocales} from 'react-native-localize';

i18n.use(initReactI18next).init({
  lng: 'sp',
  fallbackLng: 'sp',
  compatibilityJSON: 'v3',
  resources: {
    en: {
      translation: {
        "key": "en",
        "loginTitle": "Sign In",
        "loginPassword": "Password",
        "loginEmail": "Email Address",
        "loginForgotPassword": "Forgot password",
        "loginAppName": "Eatance Restaurant",
        "loginWelcome": "Welcome",
        "loginPhone": "Phone Number",
        "loginSignWithEmail": "Sign In with Email",
        "loginSignWithPhone": "Sign In with Phone number",
        "loginRemember": "Remember me",
        "dialogOkay": "Okay",
        "dialogCancel": "Cancel",
        "dialogYes": "Yes",
        "dialogNo": "No",
        "dialogConfirm": "Confirm",
        "homeTitle": "Home",
        "accountsSignOut": "Sign Out",
        "sidebarVersion": "Version",
        "accountsTitle": "Account",
        "accountsEditProfile": "Edit Profile",
        "accountsChangePassword": "Change Password",
        "accountsSelectLanguage": "Select Language",
        "accountsChooseLanguage": "Choose Language",
        "generalForceUpdate": "Please update application to continue",
        "generalUpdateapp": "Application update available",
        "generalAccept": "Accept",
        "generalReject": "Reject",
        "generalSelectProfilePic": "Select Profile Picture",
        "generalSubmit": "Submit",
        "generalChoosePhotoTitle": "Choose From Gallery",
        "generalCapturePhotoTitle": "Capture Photo",
        "generalLogoutAlert": "Are you sure want to Sign Out ?",
        "generalUpdate": "Update",
        "generalSelectAvatar": "Select Avatar",
        "generalSelectFromLibrary": "Select from library",
        "generalNoInternetMessage": "Please check Internet Connection",
        "generalNoInternet": "No Internet Connection",
        "generalWebServiceError": "Something went wrong. Please try again after sometime.",
        "generalNewOrder": "New Order(s)",
        "generalInProgress": "Ongoing Order(s)",
        "generalNoNewOrders": "No new orders found",
        "generalNoNewOrdersSubtitle": "You will be notified when a new order is placed.",
        "generalNoInProgressOrders": "No onGoing orders found.",
        "generalNoPastOrders": "No past orders found.",
        "generalOrderDescription": "Order Description:",
        "generalView": "View Order",
        "generalSelect": "Select",
        "generalAssignDriver": "Assign Driver",
        "generalReassignDriver": "Re-assign Driver",
        "generalFetchingNew": "Refresing...",
        "generalUpdateStatus": "Update Order Status",
        "generalChooseDriver": "Choose Driver",
        "generalNoData": "No data found.",
        "generalCameraError": "Please allow camera permission from Settings",
        "generalFileError": "Please allow files and media permission from Settings",
        "validationEmptyEmail": "Please enter email address",
        "validationEmptyPassword": "Please enter password",
        "validationEmptyPhone": "Please enter Phone Number",
        "validationValidEmail": "Please enter valid email address",
        "validationValidPassword": "Password should be 6-12 char alphanumeric, upercase ,lowercase and special symbol from #?!@$%^&*-.",
        "validationRequiredField": "This field is required",
        "validationPasswordSameMsg": "New password and confirm password should be same",
        "validationOldPasswordMsg": "Please enter old password",
        "validationNewPasswordMsg": "Please enter new password",
        "validationPasswordSuccess": "Password changed successfully",
        "validationEmptyFirstName": "Please enter first name",
        "validationEmptyLastName": "Please enter last name",
        "orderTime": "Order time",
        "orderDate": "Order Date: ",
        "orderAmount": "Order Amount: ",
        "orderPast": "Past Orders",
        "orderDetails": "Order Details",
        "orderDateAccepted": "Date of Order",
        "orderTimeAccepted": "Time of Order",
        "orderAssignedTo": "Assigned To Driver: ",
        "orderId": "Order ID: ",
        "orderStatus": "Order Status: ",
        "orderCurrentStatus": "Current Status: ",
        "orderType": "Order Type: ",
        "orderPaymentMode": "Payment Method: ",
        "orderPaymentStatus": "Payment Status: ",
        "orderPickup": "Pick Up",
        "orderDelivery": "Delivery",
        "orderCod": "Cash on delivery",
        "orderPaid": "Paid Online",
        "orderCustomer": "Customer Details: ",
        "orderRestDetails": "Store Details: ",
        "orderPrintOrder": "Print Order",
        "orderCannotPrint": "Cannot Print Order",
        "orderPreOrderTime": "Order delivery scheduled for",
        "orderDinein": "Dine In",
        "orderTable": "Table No : ",
        "orderSelectoption": "Please select an option",
        "orderMarkPaid": "Mark order as paid -",
        "orderAddPayment": "Add Payment",
        "orderPaymentMethod": "Payment Method",
        "orderTransactionNo": "Transaction Number",
        "orderCard": "Card",
        "orderCash": "Cash",
        "orderSelectPayment": "Select Payment Method",
        "orderPaidDineIn": "Paid",
        "orderUnPaid": "Un Paid",
        "orderOf": "Showing Order(s) For: ",
        "orderFrom": "From: ",
        "orderTo": "To: ",
        "profileTitle": "Profile",
        "profileOldPassword": "Old Password",
        "profileNewPassword": "New Password",
        "profileConfirmPassword": "Confirm Password",
        "profileFirstName": "First Name",
        "profileLastName": "Last Name",
        "profileEail": "Email Address",
        "profileNotification": "Notifications",
        "profileProfileUpdate": "Profile updated successfully",
        "profileSave": "Save",
        "orderCancellationReasonsOther": "Other",
        "orderCancellationReasonsSelectReason": "Select reason for cancellation",
        "orderCancellationReasonsSelectRejectReason": "Select reason for rejection",
        "orderCancellationReasonsEnterReason": "Enter reason here",
        "orderCancellationReasonsEmptyReason": "Please enter reason for cancellation",
        "orderCancellationReasonsEmptyRejectReason": "Please enter reason for rejection",
        "orderCancellationReasonsPleaseSelectReason": "Please select reason for cancellation",
        "orderCancellationReasonsPleaseSelectRejectReason": "Please select reason for rejection",
        "filterTitle": "Filter",
        "filterHeader": "Show Order(s) Of: ",
        "filterFrom": "Show Order(s) From",
        "filterTill": "Show Order(s) Till",
        "filterApply": "Apply",
        "filterReset": "Reset",
        "filterToday": "Today",
        "filterYesterday": "Yesterday",
        "filterThisMonth": "This Month",
        "filterCustomRange": "Custom Range",
        "orderCancelReason": "Cancel Reason: ",
        "orderRejectReason": "Reject Reason: ",
        "searchPlaceholder": "Search for orders",
        "viewProfile": "View Profile",
        "deliveryDescription": "Delivery Instruction:",
        "emptyConfirmPassword": "Please enter confirm password"
    },
    },
    sp: {
      translation: {
        "key": "es",
        "loginTitle": "Ingresar",
        "loginPassword": "Contraseña",
        "loginEmail": "Email",
        "loginForgotPassword": "Olvidé la contraseña",
        "loginAppName": "Jala La Jarra",
        "loginWelcome": "Bienvenido",
        "loginPhone": "Teléfono",
        "loginSignWithEmail": "Ingresa con Email",
        "loginSignWithPhone": "Ingresa con tu número",
        "loginRemember": "Recordar",
        "dialogOkay": "Ok",
        "dialogCancel": "Cancelar",
        "dialogYes": "Si",
        "dialogNo": "No",
        "dialogConfirm": "Confirmar",
        "homeTitle": "Inicio",
        "accountsSignOut": "Salir",
        "sidebarVersion": "Versión",
        "accountsTitle": "Cuenta",
        "accountsEditProfile": "Editar Perfil",
        "accountsChangePassword": "Cambiar contraseña",
        "accountsSelectLanguage": "Seleccionar Idioma",
        "accountsChooseLanguage": "Seleccionar Idioma",
        "generalForceUpdate": "Porfavor actualice la app para continuar.",
        "generalUpdateapp": "Actualización disponible",
        "generalAccept": "Aceptar",
        "generalReject": "Rechazar",
        "generalSelectProfilePic": "Seleccionar foto de perfil",
        "generalSubmit": "Enviar",
        "generalChoosePhotoTitle": "Elegir de la galería",
        "generalCapturePhotoTitle": "Tomar foto",
        "generalLogoutAlert": "¿Seguro que desea salir?",
        "generalUpdate": "Actualizar",
        "generalSelectAvatar": "Elegir Avatar",
        "generalSelectFromLibrary": "Seleccionar de la biblioteca",
        "generalNoInternetMessage": "Porfavor revise la conexión a internet ",
        "generalNoInternet": "No Internet",
        "generalWebServiceError": "Algo salió mal, porfavor intenté más tarde",
        "generalNewOrder": "Nuevas",
        "generalInProgress": "En curso",
        "generalNoNewOrders": "Sin nuevas ordenes",
        "generalNoNewOrdersSubtitle": "Se le avisará cuando una orden llegue",
        "generalNoInProgressOrders": "Sin órdenes en curso",
        "generalNoPastOrders": "Sin órdenes pasadas",
        "generalOrderDescription": "Descripción:",
        "generalView": "Ver",
        "generalSelect": "Seleccionar",
        "generalAssignDriver": "Asignar Driver",
        "generalReassignDriver": "Re-Asignar Driver",
        "generalFetchingNew": "Actualizando...",
        "generalUpdateStatus": "Actualizar orden",
        "generalChooseDriver": "Elegir driver",
        "generalNoData": "Sin datos",
        "generalCameraError": "Porfavor permita acceso a la cámara en Ajustes",
        "generalFileError": "Porfavor permita acceso a las fotos en Ajustes",
        "validationEmptyEmail": "Introduzca un email válido ",
        "validationEmptyPassword": "Ingrese contraseña",
        "validationEmptyPhone": "Ingrese número de teléfono",
        "validationValidEmail": "Introduzca un email valido",
        "validationValidPassword": "La contraseña debe de ser de 6-12 caracteres alfanuméricos en mayúsculas y minúsculas and y un símbolo especial #?!@$%^&*-.",
        "validationRequiredField": "Este campo es requerido",
        "validationPasswordSameMsg": "Nueva contraseña y confirmación deben ser la misma",
        "validationOldPasswordMsg": "Antigua contraseña",
        "validationNewPasswordMsg": "Nueva contraseña",
        "validationPasswordSuccess": "Password changed successfully",
        "validationEmptyFirstName": "Please enter first name",
        "validationEmptyLastName": "Please enter last name",
        "orderTime": "Hora del pedido",
        "orderDate": "Fecha del pedido: ",
        "orderAmount": "Total: ",
        "orderPast": "Ordenes pasadas",
        "orderDetails": "Detalles de la orden",
        "orderDateAccepted": "Hora del pedido",
        "orderTimeAccepted": "Fecha del pedido",
        "orderAssignedTo": "Asignado al driver: ",
        "orderId": "Orden ID: ",
        "orderStatus": "Estado del pedido:",
        "orderCurrentStatus": "Estado actual: ",
        "orderType": "Tipo de pedido: ",
        "orderPaymentMode": "Método de pago: ",
        "orderPaymentStatus": "Estado del pago:",
        "orderPickup": "Recoger",
        "orderDelivery": "A domicilio",
        "orderCod": "Pago a contraentrega",
        "orderPaid": "Pagado en la app",
        "orderCustomer": "Detalles del cliente: ",
        "orderRestDetails": "Detalles de la tienda: ",
        "orderPrintOrder": "Imprimir orden",
        "orderCannotPrint": "Imposible imprimir orden",
        "orderPreOrderTime": "Orden programada para",
        "orderDinein": "Comer aquí",
        "orderTable": "Mesa No: ",
        "orderSelectoption": "Seleccione una opción",
        "orderMarkPaid": "Marcar pedido como pagado -",
        "orderAddPayment": "Agregar Pago",
        "orderPaymentMethod": "Método de pago",
        "orderTransactionNo": "Número de transacción",
        "orderCard": "Tarjeta",
        "orderCash": "Efectivo",
        "orderSelectPayment": "Seleccionar método de pago",
        "orderPaidDineIn": "Pagado",
        "orderUnPaid": "Sin pagar",
        "orderOf": "Mostrando pedido(s) para: ",
        "orderFrom": "De: ",
        "orderTo": "Para: ",
        "profileTitle": "Perfil",
        "profileOldPassword": "Contraseña antigua",
        "profileNewPassword": "Nueva Contraseña",
        "profileConfirmPassword": "Confirmar contraseña",
        "profileFirstName": "Nombre",
        "profileLastName": "Apellido",
        "profileEail": "Email",
        "profileNotification": "Notificaciones",
        "profileProfileUpdate": "Perfil actualizado!",
        "profileSave": "Guardar",
        "orderCancellationReasonsOther": "Otro",
        "orderCancellationReasonsSelectReason": "Seleccione el motivo de la cancelación",
        "orderCancellationReasonsSelectRejectReason": "Seleccione el motivo del rechazo",
        "orderCancellationReasonsEnterReason": "Ingrese el motivo aquí",
        "orderCancellationReasonsEmptyReason": "Ingrese el motivo de la cancelación",
        "orderCancellationReasonsEmptyRejectReason": "Ingrese el motivo del rechazo",
        "orderCancellationReasonsPleaseSelectReason": "Seleccione el motivo de la cancelación",
        "orderCancellationReasonsPleaseSelectRejectReason": "Seleccione el motivo del rechazo",
        "filterTitle": "Filtro",
        "filterHeader": "Mostrar orden(es) de: ",
        "filterFrom": "Mostrar pedido(s) de",
        "filterTill": "Mostrar pedido(s) hasta",
        "filterApply": "Aplicar",
        "filterReset": "Reiniciar",
        "filterToday": "Hoy",
        "filterYesterday": "Ayer",
        "filterThisMonth": "Este mes",
        "filterCustomRange": "Rango personalizado",
        "orderCancelReason": "Cancelar motivo: ",
        "orderRejectReason": "Motivo del rechazo:: ",
        "searchPlaceholder": "Buscar pedidos",
        "viewProfile": "Ver Perfil",
        "deliveryDescription": "Instrucción de entrega:",
        "emptyConfirmPassword": "Ingrese la contraseña de confirmación"
    },
    }
  },
});
export default i18n;