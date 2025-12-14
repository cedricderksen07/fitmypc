// PC Configurator - Main Script

// Translation Data
const translations = {
    de: {
        'nav_language': 'Sprache:',
        'nav_account': '👤 Mein Konto',
        'header_title': 'PC Konfigurator',
        'header_subtitle': 'Zusammenstellung der optimalen Hardware-Lösung',
        'section_pc_type': 'PC-Typ wählen',
        'btn_gaming': '🎮 Gaming PC',
        'btn_office': '💼 Office PC',
        'btn_workstation': '🖥️ Workstation',
        'btn_streaming': '🎥 Streaming',
        'btn_creator': '✏️ Creator PC',
        'btn_budget': '⚡ Budget',
        'section_budget': 'PC nach Budget bauen',
        'input_budget': 'Gib dein Budget ein (z.B. 1500)',
        'btn_budget_build': 'PC automatisch zusammenstellen',
        'section_configurator': 'PC zusammenstellen',
        'btn_reset': 'Zurücksetzen',
        'label_cpu': '⚙️ Prozessor (CPU)',
        'option_cpu': '-- CPU auswählen --',
        'label_mainboard': '🖲️ Mainboard',
        'option_mainboard': '-- Mainboard auswählen --',
        'label_ram': '💾 RAM',
        'option_ram': '-- RAM auswählen --',
        'label_gpu': '🎮 Grafikkarte (GPU)',
        'option_gpu': '-- GPU auswählen --',
        'label_psu': '⚡ Netzteil (PSU)',
        'option_psu': '-- Netzteil auswählen --',
        'label_storage': '💿 Speicher (SSD/HDD)',
        'option_storage': '-- Speicher auswählen --',
        'label_case': '📦 Gehäuse',
        'option_case': '-- Gehäuse auswählen --',
        'label_cooler': '❄️ CPU-Kühler',
        'option_cooler': '-- Kühler auswählen --',
        'btn_buy': 'Kaufen',
        'compatibility_title': 'Kompatibilitätsprüfung',
        'compatibility_check': 'Wählen Sie Komponenten aus um die Kompatibilität zu prüfen',
        'summary_title': 'PC-Konfiguration',
        'uvp_label': 'UVP:',
        'compatible': '✓ Vollständig kompatibel!',
        'incompatible': '✗ Inkompatibilität erkannt!',
        'case_selection_title': '1. Wählen Sie Ihr Gehäuse',
        'btn_complete_pc': '🖥️ Nur PC kaufen',
        'btn_complete_full': '📦 Schließ die Konfiguration ab mit jeglichem Zubehör (HDMI Kabel u.s.w.)',
        'section_prebuilt': 'Empfohlene Fertig-PCs',
        'prebuilt_gaming': 'Gaming PC Bundle',
        'prebuilt_office': 'Office Workstation',
        'prebuilt_creator': 'Creator Workstation',
        'prebuilt_budget': 'Budget Gaming PC',
        'prebuilt_streaming': 'Streaming PC',
        'prebuilt_ultrahigh': 'Ultrahigh-End PC',
        'footer_copyright': '© 2025 PC Konfigurator. Alle Rechte vorbehalten.',
        'footer_impressum': 'Impressum',
        'footer_datenschutz': 'Datenschutz',
        'budget_error': 'Bitte geben Sie ein gültiges Budget ein!',
        'budget_not_found': 'Keine kompatible PC-Konfiguration für €{budget} gefunden!',
        'budget_try_higher': 'Versuchen Sie ein höheres Budget einzugeben.',
        'budget_found': '✓ PC-Konfiguration gefunden!',
        'budget_price': 'Gesamtpreis: UVP: €{price}',
        'checkout_title': 'Gesamtkauf',
        'checkout_subtitle': 'Übersicht Ihrer PC-Konfiguration',
        'checkout_back': '← Zurück zum Konfigurator',
        'checkout_overview': 'PC-Konfiguration Übersicht',
        'checkout_loading': 'Laden...',
        'checkout_summary_title': 'Gesamtübersicht',
        'checkout_summary_loading': 'Wird geladen...',
        'checkout_back_btn': '← Zurück',
        'checkout_final_btn': 'Kauf abschließen (alle Komponenten kaufen)',
        'checkout_components': 'Anzahl Komponenten:',
        'checkout_total_price': 'Gesamtpreis (UVP):',
        'checkout_no_config': 'Keine Konfiguration gefunden. Zum Konfigurator zurück',
        'checkout_please_create': 'Bitte erstellen Sie zuerst eine PC-Konfiguration.',
        'checkout_alert': 'Die Komponenten wurden in neuen Tabs geöffnet. Sie können diese jetzt kaufen.',
        'account_title': 'Mein Konto',
        'account_subtitle': 'Melden Sie sich an oder registrieren Sie sich',
        'tab_login': 'Login',
        'tab_register': 'Registrierung',
        'login_email': 'E-Mail:',
        'login_email_placeholder': 'ihre@email.de',
        'login_password': 'Passwort:',
        'login_password_placeholder': 'Passwort',
        'login_remember': 'Angemeldet bleiben',
        'login_submit': 'Login',
        'login_forgot': 'Passwort vergessen?',
        'register_name': 'Vollständiger Name:',
        'register_name_placeholder': 'Ihr Name',
        'register_email': 'E-Mail:',
        'register_email_placeholder': 'ihre@email.de',
        'register_password': 'Passwort:',
        'register_password_placeholder': 'Mindestens 8 Zeichen',
        'register_password_confirm': 'Passwort wiederholen:',
        'register_password_confirm_placeholder': 'Passwort wiederholen',
        'register_terms': 'Ich akzeptiere die Datenschutzerklärung',
        'register_submit': 'Registrieren',
        'logged_in_welcome': 'Willkommen zurück!',
        'logged_in_info_title': 'Ihre Profilinformationen',
        'logged_in_name': 'Name:',
        'logged_in_email': 'E-Mail:',
        'logged_in_actions': 'Aktionen',
        'logged_in_edit': 'Profil bearbeiten',
        'logged_in_logout': 'Logout',
        'password_mismatch': 'Passwörter stimmen nicht überein!',
        'edit_profile_coming': 'Profilbearbeitung kommt bald!',
        'section_accessories': '🛍️ Empfohlenes Zubehör',
        'accessories_cables': 'Kabel',
        'accessories_monitors': 'Monitore',
        'accessories_peripherals': 'Peripherie & Zubehör',
        'accessories_selected': 'Gewähltes Zubehör',
        'accessories_add': 'Hinzufügen',
        'accessories_remove': 'Entfernen',
        'accessories_total': 'Zubehör Gesamtpreis:',
        'accessories_note': 'siehe das vollständig vorhandene zubehör'
    },
    en: {
        'nav_language': 'Language:',
        'nav_account': '👤 My Account',
        'header_title': 'PC Configurator',
        'header_subtitle': 'Assemble your optimal hardware solution',
        'section_pc_type': 'Select PC Type',
        'btn_gaming': '🎮 Gaming PC',
        'btn_office': '💼 Office PC',
        'btn_workstation': '🖥️ Workstation',
        'btn_streaming': '🎥 Streaming',
        'btn_creator': '✏️ Creator PC',
        'btn_budget': '⚡ Budget',
        'section_budget': 'Build PC by Budget',
        'input_budget': 'Enter your budget (e.g. 1500)',
        'btn_budget_build': 'Auto-build PC',
        'section_configurator': 'Configure PC',
        'btn_reset': 'Reset',
        'label_cpu': '⚙️ Processor (CPU)',
        'option_cpu': '-- Select CPU --',
        'label_mainboard': '🖲️ Mainboard',
        'option_mainboard': '-- Select Mainboard --',
        'label_ram': '💾 RAM',
        'option_ram': '-- Select RAM --',
        'label_gpu': '🎮 Graphics Card (GPU)',
        'option_gpu': '-- Select GPU --',
        'label_psu': '⚡ Power Supply (PSU)',
        'option_psu': '-- Select PSU --',
        'label_storage': '💿 Storage (SSD/HDD)',
        'option_storage': '-- Select Storage --',
        'label_case': '📦 Case',
        'option_case': '-- Select Case --',
        'label_cooler': '❄️ CPU Cooler',
        'option_cooler': '-- Select Cooler --',
        'btn_buy': 'Buy',
        'compatibility_title': 'Compatibility Check',
        'compatibility_check': 'Select components to check compatibility',
        'summary_title': 'PC Configuration',
        'uvp_label': 'RRP:',
        'compatible': '✓ Fully compatible!',
        'incompatible': '✗ Incompatibility detected!',
        'case_selection_title': '1. Select Your Case',
        'btn_complete_pc': '🖥️ Buy PC Only',
        'btn_complete_full': '📦 Complete Configuration With All Accessories (HDMI Cables, etc.)',
        'section_prebuilt': 'Recommended Pre-Built PCs',
        'prebuilt_gaming': 'Gaming PC Bundle',
        'prebuilt_office': 'Office Workstation',
        'prebuilt_creator': 'Creator Workstation',
        'prebuilt_budget': 'Budget Gaming PC',
        'prebuilt_streaming': 'Streaming PC',
        'prebuilt_ultrahigh': 'Ultrahigh-End PC',
        'footer_copyright': '© 2025 PC Configurator. All rights reserved.',
        'footer_impressum': 'Impressum',
        'footer_datenschutz': 'Privacy Policy',
        'budget_error': 'Please enter a valid budget!',
        'budget_not_found': 'No compatible PC configuration found for €{budget}!',
        'budget_try_higher': 'Try entering a higher budget.',
        'budget_found': '✓ PC configuration found!',
        'budget_price': 'Total price: RRP: €{price}',
        'checkout_title': 'Complete Purchase',
        'checkout_subtitle': 'Overview of your PC configuration',
        'checkout_back': '← Back to Configurator',
        'checkout_overview': 'PC Configuration Overview',
        'checkout_loading': 'Loading...',
        'checkout_summary_title': 'Summary',
        'checkout_summary_loading': 'Loading...',
        'checkout_back_btn': '← Back',
        'checkout_final_btn': 'Complete Purchase (Buy All Components)',
        'checkout_components': 'Number of Components:',
        'checkout_total_price': 'Total Price (RRP):',
        'checkout_no_config': 'No configuration found. Back to Configurator',
        'checkout_please_create': 'Please create a PC configuration first.',
        'checkout_alert': 'Components opened in new tabs. You can now purchase them.',
        'account_title': 'My Account',
        'account_subtitle': 'Log in or register',
        'tab_login': 'Login',
        'tab_register': 'Register',
        'login_email': 'E-Mail:',
        'login_email_placeholder': 'your@email.com',
        'login_password': 'Password:',
        'login_password_placeholder': 'Password',
        'login_remember': 'Stay logged in',
        'login_submit': 'Login',
        'login_forgot': 'Forgot password?',
        'register_name': 'Full Name:',
        'register_name_placeholder': 'Your Name',
        'register_email': 'E-Mail:',
        'register_email_placeholder': 'your@email.com',
        'register_password': 'Password:',
        'register_password_placeholder': 'At least 8 characters',
        'register_password_confirm': 'Confirm Password:',
        'register_password_confirm_placeholder': 'Confirm Password',
        'register_terms': 'I accept the Privacy Policy',
        'register_submit': 'Register',
        'logged_in_welcome': 'Welcome back!',
        'logged_in_info_title': 'Your Profile Information',
        'logged_in_name': 'Name:',
        'logged_in_email': 'E-Mail:',
        'logged_in_actions': 'Actions',
        'logged_in_edit': 'Edit Profile',
        'logged_in_logout': 'Logout',
        'password_mismatch': 'Passwords do not match!',
        'edit_profile_coming': 'Profile editing coming soon!',
        'section_accessories': '🛍️ Recommended Accessories',
        'accessories_cables': 'Cables',
        'accessories_monitors': 'Monitors',
        'accessories_peripherals': 'Peripherals & Accessories',
        'accessories_selected': 'Selected Accessories',
        'accessories_add': 'Add',
        'accessories_remove': 'Remove',
        'accessories_total': 'Accessories Total Price:',
        'accessories_note': 'see the complete available accessories'
    },
    fr: {
        'nav_language': 'Langue:',
        'nav_account': '👤 Mon Compte',
        'header_title': 'Configurateur PC',
        'header_subtitle': 'Assemblez votre solution matérielle optimale',
        'section_pc_type': 'Sélectionner le type de PC',
        'btn_gaming': '🎮 PC Gaming',
        'btn_office': '💼 PC Bureau',
        'btn_workstation': '🖥️ Workstation',
        'btn_streaming': '🎥 Streaming',
        'btn_creator': '✏️ PC Créateur',
        'btn_budget': '⚡ Budget',
        'section_budget': 'Créer un PC par Budget',
        'input_budget': 'Entrez votre budget (ex. 1500)',
        'btn_budget_build': 'Construire PC automatiquement',
        'section_configurator': 'Configurer PC',
        'btn_reset': 'Réinitialiser',
        'label_cpu': '⚙️ Processeur (CPU)',
        'option_cpu': '-- Sélectionner CPU --',
        'label_mainboard': '🖲️ Carte Mère',
        'option_mainboard': '-- Sélectionner Carte Mère --',
        'label_ram': '💾 RAM',
        'option_ram': '-- Sélectionner RAM --',
        'label_gpu': '🎮 Carte Graphique (GPU)',
        'option_gpu': '-- Sélectionner GPU --',
        'label_psu': '⚡ Alimentation (PSU)',
        'option_psu': '-- Sélectionner PSU --',
        'label_storage': '💿 Stockage (SSD/HDD)',
        'option_storage': '-- Sélectionner Stockage --',
        'label_case': '📦 Boîtier',
        'option_case': '-- Sélectionner Boîtier --',
        'label_cooler': '❄️ Ventilateur CPU',
        'option_cooler': '-- Sélectionner Ventilateur --',
        'btn_buy': 'Acheter',
        'compatibility_title': 'Vérification de Compatibilité',
        'compatibility_check': 'Sélectionnez des composants pour vérifier la compatibilité',
        'summary_title': 'Configuration PC',
        'uvp_label': 'PVP:',
        'compatible': '✓ Entièrement compatible!',
        'incompatible': '✗ Incompatibilité détectée!',
        'case_selection_title': '1. Sélectionnez Votre Boîtier',
        'btn_complete_pc': '🖥️ Acheter Seulement le PC',
        'btn_complete_full': '📦 Terminez la Configuration Avec Tous les Accessoires (Câbles HDMI, etc.)',
        'section_prebuilt': 'PC Préconfigurés Recommandés',
        'prebuilt_gaming': 'Bundle PC Gaming',
        'prebuilt_office': 'Workstation Bureau',
        'prebuilt_creator': 'Workstation Créateur',
        'prebuilt_budget': 'PC Gaming Budget',
        'prebuilt_streaming': 'PC Streaming',
        'prebuilt_ultrahigh': 'PC Ultrahaut de Gamme',
        'footer_copyright': '© 2025 Configurateur PC. Tous droits réservés.',
        'footer_impressum': 'Mentions Légales',
        'footer_datenschutz': 'Politique de Confidentialité',
        'budget_error': 'Veuillez entrer un budget valide!',
        'budget_not_found': 'Aucune configuration PC compatible trouvée pour €{budget}!',
        'budget_try_higher': 'Essayez d\'entrer un budget plus élevé.',
        'budget_found': '✓ Configuration PC trouvée!',
        'budget_price': 'Prix total: PVP: €{price}',
        'checkout_title': 'Achat Complet',
        'checkout_subtitle': 'Aperçu de votre configuration PC',
        'checkout_back': '← Retour au Configurateur',
        'checkout_overview': 'Aperçu de la Configuration PC',
        'checkout_loading': 'Chargement...',
        'checkout_summary_title': 'Résumé',
        'checkout_summary_loading': 'Chargement...',
        'checkout_back_btn': '← Retour',
        'checkout_final_btn': 'Finaliser l\'Achat (Acheter Tous les Composants)',
        'checkout_components': 'Nombre de Composants:',
        'checkout_total_price': 'Prix Total (PVP):',
        'checkout_no_config': 'Aucune configuration trouvée. Retour au Configurateur',
        'checkout_please_create': 'Veuillez d\'abord créer une configuration PC.',
        'checkout_alert': 'Composants ouverts dans de nouveaux onglets. Vous pouvez maintenant les acheter.',
        'account_title': 'Mon Compte',
        'account_subtitle': 'Connectez-vous ou inscrivez-vous',
        'tab_login': 'Connexion',
        'tab_register': 'Inscription',
        'login_email': 'E-Mail:',
        'login_email_placeholder': 'votre@email.fr',
        'login_password': 'Mot de passe:',
        'login_password_placeholder': 'Mot de passe',
        'login_remember': 'Rester connecté',
        'login_submit': 'Connexion',
        'login_forgot': 'Mot de passe oublié?',
        'register_name': 'Nom Complet:',
        'register_name_placeholder': 'Votre Nom',
        'register_email': 'E-Mail:',
        'register_email_placeholder': 'votre@email.fr',
        'register_password': 'Mot de passe:',
        'register_password_placeholder': 'Au minimum 8 caractères',
        'register_password_confirm': 'Confirmer Mot de passe:',
        'register_password_confirm_placeholder': 'Confirmer Mot de passe',
        'register_terms': 'J\'accepte la Politique de Confidentialité',
        'register_submit': 'S\'inscrire',
        'logged_in_welcome': 'Bienvenue!',
        'logged_in_info_title': 'Informations de Votre Profil',
        'logged_in_name': 'Nom:',
        'logged_in_email': 'E-Mail:',
        'logged_in_actions': 'Actions',
        'logged_in_edit': 'Modifier le Profil',
        'logged_in_logout': 'Déconnexion',
        'password_mismatch': 'Les mots de passe ne correspondent pas!',
        'edit_profile_coming': 'Modification de profil bientôt!',
        'section_accessories': '🛍️ Accessoires Recommandés',
        'accessories_cables': 'Câbles',
        'accessories_monitors': 'Moniteurs',
        'accessories_peripherals': 'Périphériques & Accessoires',
        'accessories_selected': 'Accessoires Sélectionnés',
        'accessories_add': 'Ajouter',
        'accessories_remove': 'Retirer',
        'accessories_total': 'Prix Total des Accessoires:',
        'accessories_note': 'voir tous les accessoires disponibles'
    },
    es: {
        'nav_language': 'Idioma:',
        'nav_account': '👤 Mi Cuenta',
        'header_title': 'Configurador de PC',
        'header_subtitle': 'Ensambla tu solución de hardware óptima',
        'section_pc_type': 'Seleccionar Tipo de PC',
        'btn_gaming': '🎮 PC Gaming',
        'btn_office': '💼 PC Oficina',
        'btn_workstation': '🖥️ Workstation',
        'btn_streaming': '🎥 Streaming',
        'btn_creator': '✏️ PC Creador',
        'btn_budget': '⚡ Presupuesto',
        'section_budget': 'Crear PC por Presupuesto',
        'input_budget': 'Ingresa tu presupuesto (ej. 1500)',
        'btn_budget_build': 'Ensamblar PC automáticamente',
        'section_configurator': 'Configurar PC',
        'btn_reset': 'Reiniciar',
        'label_cpu': '⚙️ Procesador (CPU)',
        'option_cpu': '-- Seleccionar CPU --',
        'label_mainboard': '🖲️ Placa Base',
        'option_mainboard': '-- Seleccionar Placa Base --',
        'label_ram': '💾 RAM',
        'option_ram': '-- Seleccionar RAM --',
        'label_gpu': '🎮 Tarjeta Gráfica (GPU)',
        'option_gpu': '-- Seleccionar GPU --',
        'label_psu': '⚡ Fuente de Poder (PSU)',
        'option_psu': '-- Seleccionar PSU --',
        'label_storage': '💿 Almacenamiento (SSD/HDD)',
        'option_storage': '-- Seleccionar Almacenamiento --',
        'label_case': '📦 Caja',
        'option_case': '-- Seleccionar Caja --',
        'label_cooler': '❄️ Enfriador CPU',
        'option_cooler': '-- Seleccionar Enfriador --',
        'btn_buy': 'Comprar',
        'compatibility_title': 'Verificación de Compatibilidad',
        'compatibility_check': 'Selecciona componentes para verificar compatibilidad',
        'summary_title': 'Configuración PC',
        'uvp_label': 'PVP:',
        'compatible': '✓ ¡Totalmente compatible!',
        'incompatible': '✗ ¡Incompatibilidad detectada!',
        'case_selection_title': '1. Seleccione Su Caja',
        'btn_complete_pc': '🖥️ Comprar Solo la PC',
        'btn_complete_full': '📦 Completa la Configuración Con Todos los Accesorios (Cables HDMI, etc.)',
        'section_prebuilt': 'PC Preconstruidos Recomendados',
        'prebuilt_gaming': 'Bundle PC Gaming',
        'prebuilt_office': 'Workstation Oficina',
        'prebuilt_creator': 'Workstation Creador',
        'prebuilt_budget': 'PC Gaming Presupuesto',
        'prebuilt_streaming': 'PC Streaming',
        'prebuilt_ultrahigh': 'PC Ultra Alta Gama',
        'footer_copyright': '© 2025 Configurador de PC. Todos los derechos reservados.',
        'footer_impressum': 'Aviso Legal',
        'footer_datenschutz': 'Política de Privacidad',
        'budget_error': '¡Por favor ingresa un presupuesto válido!',
        'budget_not_found': '¡No se encontró configuración de PC compatible para €{budget}!',
        'budget_try_higher': 'Intenta ingresando un presupuesto más alto.',
        'budget_found': '✓ ¡Configuración de PC encontrada!',
        'budget_price': 'Precio total: PVP: €{price}',
        'checkout_title': 'Compra Completa',
        'checkout_subtitle': 'Descripción general de tu configuración de PC',
        'checkout_back': '← Volver al Configurador',
        'checkout_overview': 'Descripción General de Configuración',
        'checkout_loading': 'Cargando...',
        'checkout_summary_title': 'Resumen',
        'checkout_summary_loading': 'Cargando...',
        'checkout_back_btn': '← Atrás',
        'checkout_final_btn': 'Finalizar Compra (Comprar Todos los Componentes)',
        'checkout_components': 'Número de Componentes:',
        'checkout_total_price': 'Precio Total (PVP):',
        'checkout_no_config': 'Configuración no encontrada. Volver al Configurador',
        'checkout_please_create': 'Por favor crea una configuración de PC primero.',
        'checkout_alert': 'Componentes abiertos en nuevas pestañas. Ahora puede comprarlos.',
        'account_title': 'Mi Cuenta',
        'account_subtitle': 'Inicia sesión o regístrate',
        'tab_login': 'Iniciar Sesión',
        'tab_register': 'Registro',
        'login_email': 'E-Mail:',
        'login_email_placeholder': 'tu@email.es',
        'login_password': 'Contraseña:',
        'login_password_placeholder': 'Contraseña',
        'login_remember': 'Mantener sesión iniciada',
        'login_submit': 'Iniciar Sesión',
        'login_forgot': '¿Olvidaste tu contraseña?',
        'register_name': 'Nombre Completo:',
        'register_name_placeholder': 'Tu Nombre',
        'register_email': 'E-Mail:',
        'register_email_placeholder': 'tu@email.es',
        'register_password': 'Contraseña:',
        'register_password_placeholder': 'Mínimo 8 caracteres',
        'register_password_confirm': 'Confirmar Contraseña:',
        'register_password_confirm_placeholder': 'Confirmar Contraseña',
        'register_terms': 'Acepto la Política de Privacidad',
        'register_submit': 'Registrarse',
        'logged_in_welcome': '¡Bienvenido!',
        'logged_in_info_title': 'Tu Información de Perfil',
        'logged_in_name': 'Nombre:',
        'logged_in_email': 'E-Mail:',
        'logged_in_actions': 'Acciones',
        'logged_in_edit': 'Editar Perfil',
        'logged_in_logout': 'Cerrar Sesión',
        'password_mismatch': '¡Las contraseñas no coinciden!',
        'edit_profile_coming': '¡Edición de perfil próximamente!',
        'section_accessories': '🛍️ Accesorios Recomendados',
        'accessories_cables': 'Cables',
        'accessories_monitors': 'Monitores',
        'accessories_peripherals': 'Periféricos y Accesorios',
        'accessories_selected': 'Accesorios Seleccionados',
        'accessories_add': 'Agregar',
        'accessories_remove': 'Quitar',
        'accessories_total': 'Precio Total de Accesorios:',
        'accessories_note': 've todos los accesorios disponibles'
    },
    it: {
        'nav_language': 'Lingua:',
        'nav_account': '👤 Il Mio Account',
        'header_title': 'Configuratore PC',
        'header_subtitle': 'Assembla la tua soluzione hardware ottimale',
        'section_pc_type': 'Seleziona Tipo di PC',
        'btn_gaming': '🎮 PC Gaming',
        'btn_office': '💼 PC Ufficio',
        'btn_workstation': '🖥️ Workstation',
        'btn_streaming': '🎥 Streaming',
        'btn_creator': '✏️ PC Creator',
        'btn_budget': '⚡ Budget',
        'section_budget': 'Crea PC per Budget',
        'input_budget': 'Inserisci il tuo budget (es. 1500)',
        'btn_budget_build': 'Assembla PC automaticamente',
        'section_configurator': 'Configura PC',
        'btn_reset': 'Reimposta',
        'label_cpu': '⚙️ Processore (CPU)',
        'option_cpu': '-- Seleziona CPU --',
        'label_mainboard': '🖲️ Scheda Madre',
        'option_mainboard': '-- Seleziona Scheda Madre --',
        'label_ram': '💾 RAM',
        'option_ram': '-- Seleziona RAM --',
        'label_gpu': '🎮 Scheda Grafica (GPU)',
        'option_gpu': '-- Seleziona GPU --',
        'label_psu': '⚡ Alimentatore (PSU)',
        'option_psu': '-- Seleziona PSU --',
        'label_storage': '💿 Archiviazione (SSD/HDD)',
        'option_storage': '-- Seleziona Archiviazione --',
        'label_case': '📦 Case',
        'option_case': '-- Seleziona Case --',
        'label_cooler': '❄️ Raffreddamento CPU',
        'option_cooler': '-- Seleziona Raffreddamento --',
        'btn_buy': 'Acquista',
        'compatibility_title': 'Verifica Compatibilità',
        'compatibility_check': 'Seleziona componenti per verificare la compatibilità',
        'summary_title': 'Configurazione PC',
        'uvp_label': 'PVP:',
        'compatible': '✓ Completamente compatibile!',
        'incompatible': '✗ Incompatibilità rilevata!',
        'case_selection_title': '1. Seleziona Il Tuo Case',
        'btn_complete_pc': '🖥️ Acquista Solo PC',
        'btn_complete_full': '📦 Completa la Configurazione Con Tutti gli Accessori (Cavi HDMI, ecc.)',
        'section_prebuilt': 'PC Precostruiti Consigliati',
        'prebuilt_gaming': 'Bundle PC Gaming',
        'prebuilt_office': 'Workstation Ufficio',
        'prebuilt_creator': 'Workstation Creator',
        'prebuilt_budget': 'PC Gaming Budget',
        'prebuilt_streaming': 'PC Streaming',
        'prebuilt_ultrahigh': 'PC Ultra Alto Gamma',
        'footer_copyright': '© 2025 Configuratore PC. Tutti i diritti riservati.',
        'footer_impressum': 'Informazioni Legali',
        'footer_datenschutz': 'Politica sulla Privacy',
        'budget_error': 'Per favore inserisci un budget valido!',
        'budget_not_found': 'Nessuna configurazione PC compatibile trovata per €{budget}!',
        'budget_try_higher': 'Prova a inserire un budget più elevato.',
        'budget_found': '✓ Configurazione PC trovata!',
        'budget_price': 'Prezzo totale: PVP: €{price}',
        'checkout_title': 'Acquisto Completo',
        'checkout_subtitle': 'Panoramica della tua configurazione PC',
        'checkout_back': '← Torna al Configuratore',
        'checkout_overview': 'Panoramica Configurazione PC',
        'checkout_loading': 'Caricamento...',
        'checkout_summary_title': 'Riepilogo',
        'checkout_summary_loading': 'Caricamento...',
        'checkout_back_btn': '← Indietro',
        'checkout_final_btn': 'Completa Acquisto (Acquista Tutti i Componenti)',
        'checkout_components': 'Numero di Componenti:',
        'checkout_total_price': 'Prezzo Totale (PVP):',
        'checkout_no_config': 'Configurazione non trovata. Torna al Configuratore',
        'checkout_please_create': 'Per favore crea prima una configurazione PC.',
        'checkout_alert': 'Componenti aperti in nuove schede. Ora puoi acquistarli.',
        'account_title': 'Il Mio Account',
        'account_subtitle': 'Accedi o registrati',
        'tab_login': 'Accedi',
        'tab_register': 'Registrazione',
        'login_email': 'E-Mail:',
        'login_email_placeholder': 'tuo@email.it',
        'login_password': 'Password:',
        'login_password_placeholder': 'Password',
        'login_remember': 'Rimani connesso',
        'login_submit': 'Accedi',
        'login_forgot': 'Password dimenticata?',
        'register_name': 'Nome Completo:',
        'register_name_placeholder': 'Il Tuo Nome',
        'register_email': 'E-Mail:',
        'register_email_placeholder': 'tuo@email.it',
        'register_password': 'Password:',
        'register_password_placeholder': 'Almeno 8 caratteri',
        'register_password_confirm': 'Conferma Password:',
        'register_password_confirm_placeholder': 'Conferma Password',
        'register_terms': 'Accetto la Politica sulla Privacy',
        'register_submit': 'Registrati',
        'logged_in_welcome': 'Bentornato!',
        'logged_in_info_title': 'Le Tue Informazioni di Profilo',
        'logged_in_name': 'Nome:',
        'logged_in_email': 'E-Mail:',
        'logged_in_actions': 'Azioni',
        'logged_in_edit': 'Modifica Profilo',
        'logged_in_logout': 'Esci',
        'password_mismatch': 'Le password non corrispondono!',
        'edit_profile_coming': 'Modifica profilo prossimamente!',
        'section_accessories': '🛍️ Accessori Consigliati',
        'accessories_cables': 'Cavi',
        'accessories_monitors': 'Monitor',
        'accessories_peripherals': 'Periferiche e Accessori',
        'accessories_selected': 'Accessori Selezionati',
        'accessories_add': 'Aggiungi',
        'accessories_remove': 'Rimuovi',
        'accessories_total': 'Prezzo Totale Accessori:',
        'accessories_note': 'vedi tutti gli accessori disponibili'
    },
    nl: {
        'nav_language': 'Taal:',
        'nav_account': '👤 Mijn Account',
        'header_title': 'PC Configurator',
        'header_subtitle': 'Assembleer je optimale hardwareoplossing',
        'section_pc_type': 'Selecteer PC-type',
        'btn_gaming': '🎮 Gaming PC',
        'btn_office': '💼 Office PC',
        'btn_workstation': '🖥️ Workstation',
        'btn_streaming': '🎥 Streaming',
        'btn_creator': '✏️ Creator PC',
        'btn_budget': '⚡ Budget',
        'section_budget': 'PC naar Budget Bouwen',
        'input_budget': 'Voer je budget in (bijv. 1500)',
        'btn_budget_build': 'PC automatisch samenstellen',
        'section_configurator': 'PC Configureren',
        'btn_reset': 'Opnieuw instellen',
        'label_cpu': '⚙️ Processor (CPU)',
        'option_cpu': '-- Selecteer CPU --',
        'label_mainboard': '🖲️ Moederbord',
        'option_mainboard': '-- Selecteer Moederbord --',
        'label_ram': '💾 RAM',
        'option_ram': '-- Selecteer RAM --',
        'label_gpu': '🎮 Grafische Kaart (GPU)',
        'option_gpu': '-- Selecteer GPU --',
        'label_psu': '⚡ Voeding (PSU)',
        'option_psu': '-- Selecteer PSU --',
        'label_storage': '💿 Opslag (SSD/HDD)',
        'option_storage': '-- Selecteer Opslag --',
        'label_case': '📦 Behuizing',
        'option_case': '-- Selecteer Behuizing --',
        'label_cooler': '❄️ CPU-Koeler',
        'option_cooler': '-- Selecteer Koeler --',
        'btn_buy': 'Kopen',
        'compatibility_title': 'Compatibiliteitscontrole',
        'compatibility_check': 'Selecteer onderdelen om compatibiliteit te controleren',
        'summary_title': 'PC-configuratie',
        'uvp_label': 'UVP:',
        'compatible': '✓ Volledig compatibel!',
        'incompatible': '✗ Incompatibiliteit gedetecteerd!',
        'case_selection_title': '1. Selecteer Uw Behuizing',
        'btn_complete_pc': '🖥️ Alleen PC Kopen',
        'btn_complete_full': '📦 Sluit de Configuratie af Met Alle Accessoires (HDMI-kabels, enz.)',
        'section_prebuilt': 'Aanbevolen Voorgemaakte PC\'s',
        'prebuilt_gaming': 'Gaming PC-bundel',
        'prebuilt_office': 'Office Workstation',
        'prebuilt_creator': 'Creator Workstation',
        'prebuilt_budget': 'Budget Gaming PC',
        'prebuilt_streaming': 'Streaming PC',
        'prebuilt_ultrahigh': 'Ultrahoog Einde PC',
        'footer_copyright': '© 2025 PC Configurator. Alle rechten voorbehouden.',
        'footer_impressum': 'Impressum',
        'footer_datenschutz': 'Privacybeleid',
        'budget_error': 'Voer alstublieft een geldig budget in!',
        'budget_not_found': 'Geen compatibele PC-configuratie gevonden voor €{budget}!',
        'budget_try_higher': 'Probeer een hoger budget in te voeren.',
        'budget_found': '✓ PC-configuratie gevonden!',
        'budget_price': 'Totale prijs: UVP: €{price}',
        'checkout_title': 'Volledige Aankoop',
        'checkout_subtitle': 'Overzicht van uw PC-configuratie',
        'checkout_back': '← Terug naar Configurator',
        'checkout_overview': 'Overzicht PC-configuratie',
        'checkout_loading': 'Bezig met laden...',
        'checkout_summary_title': 'Samenvatting',
        'checkout_summary_loading': 'Bezig met laden...',
        'checkout_back_btn': '← Terug',
        'checkout_final_btn': 'Aankoop Voltooien (Alle Onderdelen Kopen)',
        'checkout_components': 'Aantal Onderdelen:',
        'checkout_total_price': 'Totale Prijs (UVP):',
        'checkout_no_config': 'Configuratie niet gevonden. Terug naar Configurator',
        'checkout_please_create': 'Maak alstublieft eerst een PC-configuratie.',
        'checkout_alert': 'Onderdelen geopend in nieuwe tabbladen. U kunt ze nu kopen.',
        'account_title': 'Mijn Account',
        'account_subtitle': 'Meld u aan of registreer u',
        'tab_login': 'Inloggen',
        'tab_register': 'Registratie',
        'login_email': 'E-Mail:',
        'login_email_placeholder': 'uw@email.nl',
        'login_password': 'Wachtwoord:',
        'login_password_placeholder': 'Wachtwoord',
        'login_remember': 'Aangemeld blijven',
        'login_submit': 'Inloggen',
        'login_forgot': 'Wachtwoord vergeten?',
        'register_name': 'Volledige Naam:',
        'register_name_placeholder': 'Uw Naam',
        'register_email': 'E-Mail:',
        'register_email_placeholder': 'uw@email.nl',
        'register_password': 'Wachtwoord:',
        'register_password_placeholder': 'Minimaal 8 tekens',
        'register_password_confirm': 'Wachtwoord Bevestigen:',
        'register_password_confirm_placeholder': 'Wachtwoord Bevestigen',
        'register_terms': 'Ik accepteer het Privacybeleid',
        'register_submit': 'Registreren',
        'logged_in_welcome': 'Welkom terug!',
        'logged_in_info_title': 'Uw Profielinformatie',
        'logged_in_name': 'Naam:',
        'logged_in_email': 'E-Mail:',
        'logged_in_actions': 'Acties',
        'logged_in_edit': 'Profiel Bewerken',
        'logged_in_logout': 'Afmelden',
        'password_mismatch': 'Wachtwoorden komen niet overeen!',
        'edit_profile_coming': 'Profielbewerking binnenkort beschikbaar!',
        'section_accessories': '🛍️ Aanbevolen Accessoires',
        'accessories_cables': 'Kabels',
        'accessories_monitors': 'Monitoren',
        'accessories_peripherals': 'Randapparatuur & Accessoires',
        'accessories_selected': 'Geselecteerde Accessoires',
        'accessories_add': 'Toevoegen',
        'accessories_remove': 'Verwijderen',
        'accessories_total': 'Totale Prijs Accessoires:',
        'accessories_note': 'zie alle beschikbare accessoires'
    },
    pt: {
        'nav_language': 'Idioma:',
        'nav_account': '👤 Minha Conta',
        'header_title': 'Configurador de PC',
        'header_subtitle': 'Assembla sua solução de hardware otimizada',
        'section_pc_type': 'Selecione Tipo de PC',
        'btn_gaming': '🎮 PC Gaming',
        'btn_office': '💼 PC Escritório',
        'btn_workstation': '🖥️ Workstation',
        'btn_streaming': '🎥 Streaming',
        'btn_creator': '✏️ PC Criador',
        'btn_budget': '⚡ Orçamento',
        'section_budget': 'Criar PC por Orçamento',
        'input_budget': 'Digite seu orçamento (ex. 1500)',
        'btn_budget_build': 'Montar PC automaticamente',
        'section_configurator': 'Configurar PC',
        'btn_reset': 'Redefinir',
        'label_cpu': '⚙️ Processador (CPU)',
        'option_cpu': '-- Selecione CPU --',
        'label_mainboard': '🖲️ Placa-mãe',
        'option_mainboard': '-- Selecione Placa-mãe --',
        'label_ram': '💾 RAM',
        'option_ram': '-- Selecione RAM --',
        'label_gpu': '🎮 Placa Gráfica (GPU)',
        'option_gpu': '-- Selecione GPU --',
        'label_psu': '⚡ Fonte de Alimentação (PSU)',
        'option_psu': '-- Selecione PSU --',
        'label_storage': '💿 Armazenamento (SSD/HDD)',
        'option_storage': '-- Selecione Armazenamento --',
        'label_case': '📦 Gabinete',
        'option_case': '-- Selecione Gabinete --',
        'label_cooler': '❄️ Cooler CPU',
        'option_cooler': '-- Selecione Cooler --',
        'btn_buy': 'Comprar',
        'compatibility_title': 'Verificação de Compatibilidade',
        'compatibility_check': 'Selecione componentes para verificar compatibilidade',
        'summary_title': 'Configuração do PC',
        'uvp_label': 'PVP:',
        'compatible': '✓ Totalmente compatível!',
        'incompatible': '✗ Incompatibilidade detectada!',
        'case_selection_title': '1. Selecione Seu Gabinete',
        'btn_complete_pc': '🖥️ Comprar Apenas PC',
        'btn_complete_full': '📦 Complete a Configuração Com Todos os Acessórios (Cabos HDMI, etc.)',
        'section_prebuilt': 'PCs Pré-construídos Recomendados',
        'prebuilt_gaming': 'Bundle PC Gaming',
        'prebuilt_office': 'Workstation Escritório',
        'prebuilt_creator': 'Workstation Criador',
        'prebuilt_budget': 'PC Gaming Orçamento',
        'prebuilt_streaming': 'PC Streaming',
        'prebuilt_ultrahigh': 'PC Ultra Alto Desempenho',
        'footer_copyright': '© 2025 Configurador de PC. Todos os direitos reservados.',
        'footer_impressum': 'Avisos Legais',
        'footer_datenschutz': 'Política de Privacidade',
        'budget_error': 'Por favor, digite um orçamento válido!',
        'budget_not_found': 'Nenhuma configuração de PC compatível encontrada para €{budget}!',
        'budget_try_higher': 'Tente digitar um orçamento mais alto.',
        'budget_found': '✓ Configuração de PC encontrada!',
        'budget_price': 'Preço total: PVP: €{price}',
        'checkout_title': 'Compra Completa',
        'checkout_subtitle': 'Visão geral da sua configuração de PC',
        'checkout_back': '← Voltar ao Configurador',
        'checkout_overview': 'Visão Geral da Configuração do PC',
        'checkout_loading': 'Carregando...',
        'checkout_summary_title': 'Resumo',
        'checkout_summary_loading': 'Carregando...',
        'checkout_back_btn': '← Voltar',
        'checkout_final_btn': 'Finalizar Compra (Comprar Todos os Componentes)',
        'checkout_components': 'Número de Componentes:',
        'checkout_total_price': 'Preço Total (PVP):',
        'checkout_no_config': 'Configuração não encontrada. Voltar ao Configurador',
        'checkout_please_create': 'Por favor, crie uma configuração de PC primeiro.',
        'checkout_alert': 'Componentes abertos em novas abas. Agora você pode comprá-los.',
        'account_title': 'Minha Conta',
        'account_subtitle': 'Faça login ou registre-se',
        'tab_login': 'Fazer Login',
        'tab_register': 'Registro',
        'login_email': 'E-Mail:',
        'login_email_placeholder': 'seu@email.pt',
        'login_password': 'Senha:',
        'login_password_placeholder': 'Senha',
        'login_remember': 'Permanecer conectado',
        'login_submit': 'Fazer Login',
        'login_forgot': 'Esqueceu sua senha?',
        'register_name': 'Nome Completo:',
        'register_name_placeholder': 'Seu Nome',
        'register_email': 'E-Mail:',
        'register_email_placeholder': 'seu@email.pt',
        'register_password': 'Senha:',
        'register_password_placeholder': 'Mínimo 8 caracteres',
        'register_password_confirm': 'Confirmar Senha:',
        'register_password_confirm_placeholder': 'Confirmar Senha',
        'register_terms': 'Aceito a Política de Privacidade',
        'register_submit': 'Registrar',
        'logged_in_welcome': 'Bem-vindo de volta!',
        'logged_in_info_title': 'Suas Informações de Perfil',
        'logged_in_name': 'Nome:',
        'logged_in_email': 'E-Mail:',
        'logged_in_actions': 'Ações',
        'logged_in_edit': 'Editar Perfil',
        'logged_in_logout': 'Fazer Logout',
        'password_mismatch': 'As senhas não correspondem!',
        'edit_profile_coming': 'Edição de perfil em breve!',
        'section_accessories': '🛍️ Acessórios Recomendados',
        'accessories_cables': 'Cabos',
        'accessories_monitors': 'Monitores',
        'accessories_peripherals': 'Periféricos e Acessórios',
        'accessories_selected': 'Acessórios Selecionados',
        'accessories_add': 'Adicionar',
        'accessories_remove': 'Remover',
        'accessories_total': 'Preço Total dos Acessórios:',
        'accessories_note': 'veja todos os acessórios disponíveis'
    }
};

// Language Handler
let currentLanguage = localStorage.getItem('language') || 'de';

function translate(key) {
    return translations[currentLanguage]?.[key] || translations['de']?.[key] || key;
}

function applyTranslations() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const text = translate(key);
        
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            if (element.type === 'text' || element.type === 'email' || element.type === 'password' || element.type === 'number') {
                element.placeholder = text;
            }
        } else if (element.tagName === 'LABEL') {
            element.textContent = text;
        } else if (element.tagName === 'BUTTON' || element.tagName === 'A') {
            element.textContent = text;
        } else if (element.tagName === 'H1' || element.tagName === 'H2' || element.tagName === 'H3') {
            element.textContent = text;
        } else if (element.tagName === 'P') {
            element.textContent = text;
        } else if (element.tagName === 'OPTION') {
            element.textContent = text;
        } else {
            element.textContent = text;
        }
    });
}

function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    applyTranslations();
    
    updateAllButtonTexts();
}

function updateAllButtonTexts() {
    const accessories = componentsData.accessories;
    
    const categories = {
        'Kabel': accessories.filter(a => a.type === 'Kabel'),
        'Monitor': accessories.filter(a => a.type === 'Monitor'),
        'Tastatur': accessories.filter(a => a.type === 'Tastatur'),
        'Maus': accessories.filter(a => a.type === 'Maus'),
        'Headset': accessories.filter(a => a.type === 'Headset'),
        'Zubehör': accessories.filter(a => a.type === 'Zubehör')
    };

    renderCables(categories['Kabel']);
    renderMonitors(categories['Monitor']);
    renderKeyboards(categories['Tastatur']);
    renderMice(categories['Maus']);
    renderHeadsets(categories['Headset']);
    renderOther(categories['Zubehör']);
    
    document.querySelectorAll('.accessory-btn').forEach(btn => {
        const id = btn.getAttribute('data-id');
        if (selectedAccessories.has(id)) {
            btn.classList.add('selected');
            btn.textContent = translate('accessories_remove');
        } else {
            btn.classList.remove('selected');
            btn.textContent = translate('accessories_add');
        }
    });

    updateAccessoriesSummary();
    updateCompatibility();
}

function initializeLanguage() {
    const select = document.getElementById('languageSelect');
    if (select) {
        select.value = currentLanguage;
    }
    applyTranslations();
}

// State für aktuelle Auswahl
const selected = {
    cpu: null,
    mainboard: null,
    ram: null,
    gpu: null,
    psu: null,
    storage: null,
    case: null,
    cooler: null
};

let currentPCType = 'gaming';

// Beim Laden der Seite initialisieren
document.addEventListener('DOMContentLoaded', () => {
    initializeLanguage();
    initializeConfigurator();
});

function initializeConfigurator() {
    addPCTypeListeners();
    toggleBudgetSection();
    populateDropdowns();
    initializeCaseGallery();
    addEventListeners();
    updateCompatibility();
}

/**
 * PC-Typ-Button Event Listener hinzufügen
 */
function addPCTypeListeners() {
    const typeButtons = document.querySelectorAll('.pc-type-btn');
    typeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentPCType = e.target.dataset.type;
            
            typeButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            Object.keys(selected).forEach(key => {
                selected[key] = null;
            });
            
            document.querySelectorAll('select[data-component]').forEach(select => {
                select.value = '';
            });
            
            document.querySelectorAll('[id$="-display"]').forEach(display => {
                display.innerHTML = '';
            });
            
            document.querySelectorAll('[id$="-buy"]').forEach(btn => {
                btn.classList.remove('active');
            });
            
            toggleBudgetSection();
            populateDropdowns();
            updateCompatibility();
        });
    });
}

/**
 * Budget-Sektion anzeigen/verbergen basierend auf PC-Typ
 */
function toggleBudgetSection() {
    const budgetSection = document.getElementById('budgetSection');
    budgetSection.style.display = 'block';
}

/**
 * Filter Komponenten nach PC-Typ
 */
function getComponentsByType(componentsArray) {
    return componentsArray.filter(component => {
        if (!component.types) return true;
        return component.types.includes(currentPCType);
    });
}

/**
 * Alle Dropdowns mit Komponenten aus data.js füllen
 */
function populateDropdowns() {
    // CPU Dropdown
    const cpuSelect = document.getElementById('cpu');
    cpuSelect.innerHTML = '<option value="">-- CPU auswählen --</option>';
    getComponentsByType(componentsData.cpus).forEach(cpu => {
        const option = document.createElement('option');
        option.value = cpu.id;
        option.textContent = `${cpu.name} (${cpu.socket}) - UVP: €${cpu.price}`;
        cpuSelect.appendChild(option);
    });

    // Mainboard Dropdown
    const mbSelect = document.getElementById('mainboard');
    mbSelect.innerHTML = '<option value="">-- Mainboard auswählen --</option>';
    getComponentsByType(componentsData.mainboards).forEach(mb => {
        const option = document.createElement('option');
        option.value = mb.id;
        option.textContent = `${mb.name} (${mb.socket}) - UVP: €${mb.price}`;
        mbSelect.appendChild(option);
    });

    // RAM Dropdown
    const ramSelect = document.getElementById('ram');
    ramSelect.innerHTML = '<option value="">-- RAM auswählen --</option>';
    getComponentsByType(componentsData.rams).forEach(ram => {
        const option = document.createElement('option');
        option.value = ram.id;
        option.textContent = `${ram.name} (${ram.type} ${ram.speed}MHz) - UVP: €${ram.price}`;
        ramSelect.appendChild(option);
    });

    // GPU Dropdown
    const gpuSelect = document.getElementById('gpu');
    gpuSelect.innerHTML = '<option value="">-- GPU auswählen --</option>';
    getComponentsByType(componentsData.gpus).forEach(gpu => {
        const option = document.createElement('option');
        option.value = gpu.id;
        option.textContent = `${gpu.name} (${gpu.power}W) - UVP: €${gpu.price}`;
        gpuSelect.appendChild(option);
    });

    // PSU Dropdown
    const psuSelect = document.getElementById('psu');
    psuSelect.innerHTML = '<option value="">-- Netzteil auswählen --</option>';
    getComponentsByType(componentsData.psus).forEach(psu => {
        const option = document.createElement('option');
        option.value = psu.id;
        option.textContent = `${psu.name} (${psu.type}) - UVP: €${psu.price}`;
        psuSelect.appendChild(option);
    });

    // Storage Dropdown
    const storageSelect = document.getElementById('storage');
    storageSelect.innerHTML = '<option value="">-- Speicher auswählen --</option>';
    getComponentsByType(componentsData.storages).forEach(storage => {
        const option = document.createElement('option');
        option.value = storage.id;
        option.textContent = `${storage.name} (${storage.type}) - UVP: €${storage.price}`;
        storageSelect.appendChild(option);
    });

    // Case Dropdown
    const caseSelect = document.getElementById('case');
    caseSelect.innerHTML = '<option value="">-- Gehäuse auswählen --</option>';
    getComponentsByType(componentsData.cases).forEach(caseItem => {
        const option = document.createElement('option');
        option.value = caseItem.id;
        option.textContent = `${caseItem.name} (${caseItem.psuType}) - UVP: €${caseItem.price}`;
        caseSelect.appendChild(option);
    });

    // Cooler Dropdown
    const coolerSelect = document.getElementById('cooler');
    coolerSelect.innerHTML = '<option value="">-- Kühler auswählen --</option>';
    getComponentsByType(componentsData.coolers).forEach(cooler => {
        const option = document.createElement('option');
        option.value = cooler.id;
        option.textContent = `${cooler.name} (${cooler.height}mm) - UVP: €${cooler.price}`;
        coolerSelect.appendChild(option);
    });
}

/**
 * Event Listener für alle Dropdowns hinzufügen
 */
function addEventListeners() {
    const selects = document.querySelectorAll('select[data-component]');
    selects.forEach(select => {
        select.addEventListener('change', (e) => {
            const componentType = e.target.dataset.component;
            const value = e.target.value;
            
            if (value) {
                selected[componentType] = {
                    id: value,
                    name: e.target.options[e.target.selectedIndex].textContent
                };
            } else {
                selected[componentType] = null;
            }
            
            updateComponentDisplay(componentType);
            updateCompatibility();
        });
    });

    // Reset Button
    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetConfigurator);
    }

    // Budget Button
    const budgetBtn = document.getElementById('budgetBtn');
    if (budgetBtn) {
        budgetBtn.addEventListener('click', buildPCByBudget);
    }

    // Complete Purchase Buttons
    const completeBtnPC = document.getElementById('completeBtnPC');
    const completeBtnFull = document.getElementById('completeBtnFull');
    if (completeBtnPC) {
        completeBtnPC.addEventListener('click', function() {
            proceedToCheckout(false);
        });
    }
    if (completeBtnFull) {
        completeBtnFull.addEventListener('click', function() {
            proceedToCheckout(true);
        });
    }
}

/**
 * Komponenten-Display aktualisieren (Preis + Affiliate Button)
 */
function updateComponentDisplay(componentType) {
    const displayId = `${componentType}-display`;
    const display = document.getElementById(displayId);
    const affiliateBtn = document.getElementById(`${componentType}-buy`);
    
    if (!display || !affiliateBtn) return;

    if (!selected[componentType]) {
        display.innerHTML = '';
        affiliateBtn.classList.remove('active');
        return;
    }

    const componentId = selected[componentType].id;
    const componentsArray = componentsData[componentType + 's'];
    const component = componentsArray.find(c => c.id == componentId);

    if (component) {
        display.innerHTML = `<strong>UVP: €${component.price}</strong>`;
        
        // Affiliate Button
        affiliateBtn.classList.add('active');
        affiliateBtn.onclick = () => {
            const checkoutData = {
                pcType: currentPCType,
                components: {}
            };
            Object.keys(selected).forEach(type => {
                if (selected[type]) {
                    const componentsArray = componentsData[type + 's'];
                    const comp = componentsArray.find(c => c.id == selected[type].id);
                    if (comp) {
                        checkoutData.components[type] = comp;
                    }
                }
            });
            localStorage.setItem('checkoutData', JSON.stringify(checkoutData));
            localStorage.setItem('highlightComponent', JSON.stringify({type: componentType, id: componentId}));
            window.location.href = 'checkout.html';
        };
    }
}

/**
 * Kompatibilität prüfen und anzeigen
 */
function updateCompatibility() {
    const compatDiv = document.getElementById('compatibility');
    let isCompatible = true;
    let checks = [];

    // 1. CPU ↔ Mainboard Socket
    if (selected.cpu && selected.mainboard) {
        const cpu = componentsData.cpus.find(c => c.id == selected.cpu.id);
        const mb = componentsData.mainboards.find(m => m.id == selected.mainboard.id);
        
        if (cpu && mb) {
            const match = cpu.socket === mb.socket;
            checks.push({
                name: 'CPU ↔ Mainboard Socket',
                compatible: match,
                info: `${cpu.socket} mit ${mb.socket}`
            });
            if (!match) isCompatible = false;
        }
    }

    // 2. RAM ↔ Mainboard RAM-Typ
    if (selected.ram && selected.mainboard) {
        const ram = componentsData.rams.find(r => r.id == selected.ram.id);
        const mb = componentsData.mainboards.find(m => m.id == selected.mainboard.id);
        
        if (ram && mb) {
            const match = ram.type === mb.ramType;
            checks.push({
                name: 'RAM ↔ Mainboard',
                compatible: match,
                info: `${ram.type} mit ${mb.ramType}`
            });
            if (!match) isCompatible = false;
        }
    }

    // 3. GPU-Länge ↔ Gehäuse Max-Länge
    if (selected.gpu && selected.case) {
        const gpu = componentsData.gpus.find(g => g.id == selected.gpu.id);
        const caseItem = componentsData.cases.find(c => c.id == selected.case.id);
        
        if (gpu && caseItem) {
            const match = gpu.length <= caseItem.maxGpuLength;
            checks.push({
                name: 'GPU ↔ Gehäuse Länge',
                compatible: match,
                info: `${gpu.length}mm in ${caseItem.maxGpuLength}mm`
            });
            if (!match) isCompatible = false;
        }
    }

    // 4. Kühlerhöhe ↔ Gehäuse Max-Höhe
    if (selected.cooler && selected.case) {
        const cooler = componentsData.coolers.find(c => c.id == selected.cooler.id);
        const caseItem = componentsData.cases.find(c => c.id == selected.case.id);
        
        if (cooler && caseItem) {
            const match = cooler.height <= caseItem.maxCoolerHeight;
            checks.push({
                name: 'Kühler ↔ Gehäuse Höhe',
                compatible: match,
                info: `${cooler.height}mm in ${caseItem.maxCoolerHeight}mm`
            });
            if (!match) isCompatible = false;
        }
    }

    // 5. Netzteil Wattzahl ↔ Komponenten-Verbrauch
    if (selected.psu && (selected.cpu || selected.gpu)) {
        const psu = componentsData.psus.find(p => p.id == selected.psu.id);
        const cpu = selected.cpu ? componentsData.cpus.find(c => c.id == selected.cpu.id) : null;
        const gpu = selected.gpu ? componentsData.gpus.find(g => g.id == selected.gpu.id) : null;
        
        if (psu) {
            const totalTdp = (cpu ? cpu.tdp : 0) + (gpu ? gpu.power : 0) + 100; // +100 für Rest
            const match = psu.wattage >= totalTdp * 1.25; // 25% Overhead
            checks.push({
                name: 'Netzteil ↔ Verbrauch',
                compatible: match,
                info: `${psu.wattage}W für ~${Math.ceil(totalTdp)}W`
            });
            if (!match) isCompatible = false;
        }
    }

    // 6. Netzteil Typ ↔ Gehäuse
    if (selected.psu && selected.case) {
        const psu = componentsData.psus.find(p => p.id == selected.psu.id);
        const caseItem = componentsData.cases.find(c => c.id == selected.case.id);
        
        if (psu && caseItem) {
            const match = psu.type === caseItem.psuType;
            checks.push({
                name: 'Netzteil ↔ Gehäuse',
                compatible: match,
                info: `${psu.type} in ${caseItem.psuType}`
            });
            if (!match) isCompatible = false;
        }
    }

    // HTML für Kompatibilität generieren
    let html = '';
    if (checks.length > 0) {
        checks.forEach(check => {
            const iconClass = check.compatible ? 'check' : 'cross';
            const icon = check.compatible ? '✓' : '✗';
            const rowClass = check.compatible ? 'compatible' : 'incompatible';
            
            html += `
                <div class="compatibility-item ${rowClass}">
                    <span class="compatibility-icon ${iconClass}">${icon}</span>
                    <div class="compatibility-text">
                        <strong>${check.name}</strong>
                        <small>${check.info}</small>
                    </div>
                </div>
            `;
        });
    } else {
        html = '<p style="color: #999; text-align: center;">Wählen Sie Komponenten aus um die Kompatibilität zu prüfen</p>';
    }

    compatDiv.innerHTML = html;

    // Case Gallery Kompatibilität aktualisieren
    updateCaseGalleryCompatibility();

    // Summary Box aktualisieren
    updateSummaryBox(isCompatible);
}

/**
 * Prüfe ob alle Komponenten ausgewählt sind
 */
function isConfigurationComplete() {
    return Object.values(selected).every(component => component !== null);
}

/**
 * Summary Box mit Gesamtpreis und Status aktualisieren
 */
function updateSummaryBox(isCompatible) {
    const summaryDiv = document.getElementById('summary');
    const completeBtnContainer = document.querySelector('.complete-purchase-buttons');
    
    // Gesamtpreis berechnen
    let totalPrice = 0;
    Object.keys(selected).forEach(componentType => {
        if (selected[componentType]) {
            const component = componentsData[componentType + 's'].find(c => c.id == selected[componentType].id);
            if (component) {
                totalPrice += component.price;
            }
        }
    });

    const statusClass = isCompatible ? 'status-compatible' : 'status-incompatible';
    const statusText = isCompatible ? '✓ Vollständig kompatibel!' : '✗ Inkompatibilität erkannt!';

    const html = `
        <h3>PC-Konfiguration</h3>
        <div class="total-price">UVP: €${totalPrice.toFixed(2).replace('.', ',')}</div>
        <div class="summary-status">
            <span class="${statusClass}">${statusText}</span>
        </div>
    `;

    summaryDiv.innerHTML = html;

    // Complete Purchase Buttons anzeigen/verstecken
    const isComplete = isConfigurationComplete();
    if (completeBtnContainer) {
        completeBtnContainer.style.display = isComplete ? 'block' : 'none';
    }
}

/**
 * Zum Checkout gehen
 */
function proceedToCheckout(includeAccessories = false) {
    const checkoutData = {
        pcType: currentPCType,
        components: {},
        includeAccessories: includeAccessories,
        accessories: []
    };

    // Komponenten speichern
    Object.keys(selected).forEach(componentType => {
        if (selected[componentType]) {
            const componentsArray = componentsData[componentType + 's'];
            const component = componentsArray.find(c => c.id == selected[componentType].id);
            if (component) {
                checkoutData.components[componentType] = component;
            }
        }
    });

    // Zubehör speichern wenn gewünscht
    if (includeAccessories) {
        selectedAccessories.forEach((item, id) => {
            checkoutData.accessories.push({
                id: id,
                name: item.name,
                price: item.price
            });
        });
    }

    // In localStorage speichern
    localStorage.setItem('checkoutData', JSON.stringify(checkoutData));
    localStorage.setItem('pageSource', 'main');

    // Zu Checkout-Seite navigieren
    window.location.href = 'checkout.html';
}

/**
 * Configurator zurücksetzen
 */
function resetConfigurator() {
    // Alle Select-Elemente zurücksetzen
    document.querySelectorAll('select[data-component]').forEach(select => {
        select.value = '';
    });

    // State zurücksetzen
    Object.keys(selected).forEach(key => {
        selected[key] = null;
    });

    // Displays löschen
    document.querySelectorAll('[id$="-display"]').forEach(display => {
        display.innerHTML = '';
    });

    // Affiliate Buttons verstecken
    document.querySelectorAll('[id$="-buy"]').forEach(btn => {
        btn.classList.remove('active');
    });

    // Kompatibilität und Summary aktualisieren
    updateCompatibility();
}

/**
 * PC nach Budget automatisch zusammenstellen
 */
function buildPCByBudget() {
    const budgetInput = document.getElementById('budgetInput');
    const budgetResult = document.getElementById('budgetResult');
    const budget = parseInt(budgetInput.value);

    if (!budget || budget <= 0) {
        budgetResult.innerHTML = '<h4>Bitte geben Sie ein gültiges Budget ein!</h4>';
        budgetResult.className = 'budget-result show error';
        return;
    }

    budgetResult.className = 'budget-result';
    budgetResult.innerHTML = '';

    const validConfigurations = [];

    const cpus = getComponentsByType(componentsData.cpus);
    const mbs = getComponentsByType(componentsData.mainboards);
    const rams = getComponentsByType(componentsData.rams);
    const gpus = getComponentsByType(componentsData.gpus);
    const storages = getComponentsByType(componentsData.storages);
    const cases = getComponentsByType(componentsData.cases);
    const coolers = getComponentsByType(componentsData.coolers);
    const psus = getComponentsByType(componentsData.psus);

    for (const cpu of cpus) {
        for (const mb of mbs) {
            if (cpu.socket !== mb.socket) continue;

            for (const ram of rams) {
                if (ram.type !== mb.ramType) continue;

                for (const gpu of gpus) {
                    for (const storage of storages) {
                        for (const caseItem of cases) {
                            if (gpu.length > caseItem.maxGpuLength) continue;

                            for (const cooler of coolers) {
                                if (cooler.height > caseItem.maxCoolerHeight) continue;

                                for (const psu of psus) {
                                    if (psu.type !== caseItem.psuType) continue;

                                    const totalTdp = cpu.tdp + gpu.power + 100;
                                    if (psu.wattage < totalTdp * 1.25) continue;

                                    const totalPrice = cpu.price + mb.price + ram.price + gpu.price + 
                                                     storage.price + caseItem.price + cooler.price + psu.price;

                                    if (totalPrice <= budget) {
                                        validConfigurations.push({
                                            cpu, mb, ram, gpu, storage, caseItem, cooler, psu,
                                            totalPrice,
                                            performanceScore: gpu.power + cpu.tdp
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    if (validConfigurations.length === 0) {
        budgetResult.innerHTML = `<h4>❌ Keine kompatible PC-Konfiguration für €${budget} gefunden!</h4>
            <p>Versuchen Sie ein höheres Budget einzugeben.</p>`;
        budgetResult.className = 'budget-result show error';
        return;
    }

    validConfigurations.sort((a, b) => b.performanceScore - a.performanceScore);
    const bestConfig = validConfigurations[0];

    selected.cpu = { id: bestConfig.cpu.id, name: bestConfig.cpu.name };
    selected.mainboard = { id: bestConfig.mb.id, name: bestConfig.mb.name };
    selected.ram = { id: bestConfig.ram.id, name: bestConfig.ram.name };
    selected.gpu = { id: bestConfig.gpu.id, name: bestConfig.gpu.name };
    selected.storage = { id: bestConfig.storage.id, name: bestConfig.storage.name };
    selected.case = { id: bestConfig.caseItem.id, name: bestConfig.caseItem.name };
    selected.cooler = { id: bestConfig.cooler.id, name: bestConfig.cooler.name };
    selected.psu = { id: bestConfig.psu.id, name: bestConfig.psu.name };

    document.getElementById('cpu').value = bestConfig.cpu.id;
    document.getElementById('mainboard').value = bestConfig.mb.id;
    document.getElementById('ram').value = bestConfig.ram.id;
    document.getElementById('gpu').value = bestConfig.gpu.id;
    document.getElementById('storage').value = bestConfig.storage.id;
    document.getElementById('case').value = bestConfig.caseItem.id;
    document.getElementById('cooler').value = bestConfig.cooler.id;
    document.getElementById('psu').value = bestConfig.psu.id;

    ['cpu', 'mainboard', 'ram', 'gpu', 'storage', 'case', 'cooler', 'psu'].forEach(type => {
        updateComponentDisplay(type);
    });

    updateCompatibility();

    let resultHTML = `<h4>✓ PC-Konfiguration gefunden!</h4>
        <div class="budget-result-items">
            <div class="budget-result-item">
                <strong>CPU:</strong>
                <span>${bestConfig.cpu.name}</span>
            </div>
            <div class="budget-result-item">
                <strong>Mainboard:</strong>
                <span>${bestConfig.mb.name}</span>
            </div>
            <div class="budget-result-item">
                <strong>RAM:</strong>
                <span>${bestConfig.ram.name}</span>
            </div>
            <div class="budget-result-item">
                <strong>GPU:</strong>
                <span>${bestConfig.gpu.name}</span>
            </div>
            <div class="budget-result-item">
                <strong>Storage:</strong>
                <span>${bestConfig.storage.name}</span>
            </div>
            <div class="budget-result-item">
                <strong>Case:</strong>
                <span>${bestConfig.caseItem.name}</span>
            </div>
            <div class="budget-result-item">
                <strong>Cooler:</strong>
                <span>${bestConfig.cooler.name}</span>
            </div>
            <div class="budget-result-item">
                <strong>PSU:</strong>
                <span>${bestConfig.psu.name}</span>
            </div>
            <div class="budget-result-total">
                Gesamtpreis: UVP: €${bestConfig.totalPrice}
            </div>
        </div>`;

    budgetResult.innerHTML = resultHTML;
    budgetResult.className = 'budget-result show success';
}

/**
 * Affiliate Links für Pre-Built PCs laden
 */
function initializePreBuiltPCs() {
    const prebuiltContainer = document.getElementById('prebuilt-container');
    if (!prebuiltContainer) return;

    let html = '';
    componentsData.preBuiltPCs.forEach(pc => {
        html += `
            <div class="prebuilt-card">
                <h3>${pc.name}</h3>
                <p>${pc.description}</p>
                <div class="prebuilt-price">UVP: €${pc.price.toFixed(2).replace('.', ',')}</div>
                <a href="${pc.affiliateLink}" target="_blank" class="prebuilt-btn">Jetzt kaufen</a>
            </div>
        `;
    });

    prebuiltContainer.innerHTML = html;
}

/**
 * Case Gallery Initialization
 */
function initializeCaseGallery() {
    const caseGallery = document.getElementById('caseGallery');
    if (!caseGallery) return;

    const cases = componentsData.cases;
    let html = '';

    cases.forEach(caseItem => {
        html += `
            <div class="case-card" data-case-id="${caseItem.id}">
                <div class="case-card-image">
                    hier könnte<br>ihr produkt<br>sein
                </div>
                <div class="case-card-name">${caseItem.name}</div>
                <div class="case-card-warning" style="display: none;">gehäuse zu klein für ihren pc</div>
            </div>
        `;
    });

    caseGallery.innerHTML = html;

    caseGallery.querySelectorAll('.case-card').forEach(card => {
        card.addEventListener('click', function() {
            if (!this.classList.contains('disabled')) {
                const caseId = this.getAttribute('data-case-id');
                selectCase(caseId, this);
            }
        });
    });
}

function selectCase(caseId, cardElement) {
    document.querySelectorAll('.case-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    if (cardElement) {
        cardElement.classList.add('selected');
    }
    
    const caseDropdown = document.getElementById('case');
    if (caseDropdown) {
        caseDropdown.value = caseId;
        caseDropdown.dispatchEvent(new Event('change'));
    }
}

function updateCaseGalleryCompatibility() {
    const caseCards = document.querySelectorAll('.case-card');
    
    caseCards.forEach(card => {
        const caseId = card.getAttribute('data-case-id');
        const caseItem = componentsData.cases.find(c => c.id == caseId);
        const warningEl = card.querySelector('.case-card-warning');
        
        if (!caseItem) return;
        
        let isCompatible = true;
        
        if (selected.gpu) {
            const gpu = componentsData.gpus.find(g => g.id == selected.gpu.id);
            if (gpu && gpu.length > caseItem.maxGpuLength) {
                isCompatible = false;
            }
        }
        
        if (selected.cooler) {
            const cooler = componentsData.coolers.find(c => c.id == selected.cooler.id);
            if (cooler && cooler.height > caseItem.maxCoolerHeight) {
                isCompatible = false;
            }
        }
        
        if (selected.psu) {
            const psu = componentsData.psus.find(p => p.id == selected.psu.id);
            if (psu && psu.type !== caseItem.psuType) {
                isCompatible = false;
            }
        }
        
        if (isCompatible) {
            card.classList.remove('disabled');
            if (warningEl) {
                warningEl.style.display = 'none';
            }
        } else {
            card.classList.add('disabled');
            if (warningEl) {
                warningEl.style.display = 'block';
            }
        }
    });
}

/**
 * Zubehör-Management
 */
const selectedAccessories = new Map();
// Restore saved accessories (persist across pages)
(function restoreSelectedAccessories() {
    try {
        const saved = localStorage.getItem('selectedAccessories');
        if (saved) {
            const entries = JSON.parse(saved);
            entries.forEach(([id, data]) => {
                selectedAccessories.set(id, data);
            });
        }
    } catch (e) {
        console.error('Error restoring selected accessories:', e);
    }
})();

function initializeAccessories() {
    const accessories = componentsData.accessories;
    
    const categories = {
        'Kabel': accessories.filter(a => a.type === 'Kabel'),
        'Monitor': accessories.filter(a => a.type === 'Monitor'),
        'Tastatur': accessories.filter(a => a.type === 'Tastatur'),
        'Maus': accessories.filter(a => a.type === 'Maus'),
        'Headset': accessories.filter(a => a.type === 'Headset'),
        'Zubehör': accessories.filter(a => a.type === 'Zubehör')
    };

    renderCables(categories['Kabel']);
    renderMonitors(categories['Monitor']);
    renderKeyboards(categories['Tastatur']);
    renderMice(categories['Maus']);
    renderHeadsets(categories['Headset']);
    renderOther(categories['Zubehör']);

    // mark buttons which were previously selected (restored from localStorage)
    document.querySelectorAll('.accessory-btn').forEach(btn => {
        const id = btn.getAttribute('data-id');
        if (selectedAccessories.has(id)) {
            btn.classList.add('selected');
            btn.textContent = translate('accessories_remove');
        } else {
            btn.classList.remove('selected');
            btn.textContent = translate('accessories_add');
        }
    });

    updateAccessoriesSummary();
}

function renderCables(cables) {
    const container = document.getElementById('cables-grid');
    if (!container) return;
    
    container.innerHTML = cables.map(item => `
        <div class="accessory-item">
            <div class="accessory-image">
                hier könnte<br>ihr produkt<br>sein
                <div class="accessory-info-icon" onclick="showProductInfo(${item.id}, '${item.name.replace(/'/g, "\\'")}', '${item.description.replace(/'/g, "\\'")}')">ℹ️</div>
            </div>
            <div class="accessory-name">${item.name}</div>
            <div class="accessory-price">€${item.price}</div>
            <button class="accessory-btn" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}" onclick="toggleAccessory(this)">
                ${translate('accessories_add')}
            </button>
        </div>
    `).join('');
    
    addAccessoryListeners(container);
}

function renderMonitors(monitors) {
    const container = document.getElementById('monitors-grid');
    if (!container) return;
    
    container.innerHTML = monitors.map(item => `
        <div class="accessory-item">
            <div class="accessory-image">
                hier könnte<br>ihr produkt<br>sein
                <div class="accessory-info-icon" onclick="showProductInfo(${item.id}, '${item.name.replace(/'/g, "\\'")}', '${item.description.replace(/'/g, "\\'")}')">ℹ️</div>
            </div>
            <div class="accessory-name">${item.name}</div>
            <div class="accessory-price">€${item.price}</div>
            <button class="accessory-btn" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}" onclick="toggleAccessory(this)">
                ${translate('accessories_add')}
            </button>
        </div>
    `).join('');
    
    addAccessoryListeners(container);
}

function renderKeyboards(keyboards) {
    const container = document.getElementById('keyboards-grid');
    if (!container) return;
    
    container.innerHTML = keyboards.map(item => `
        <div class="accessory-item">
            <div class="accessory-image">
                hier könnte<br>ihr produkt<br>sein
                <div class="accessory-info-icon" onclick="showProductInfo(${item.id}, '${item.name.replace(/'/g, "\\'")}', '${item.description.replace(/'/g, "\\'")}')">ℹ️</div>
            </div>
            <div class="accessory-name">${item.name}</div>
            <div class="accessory-price">€${item.price}</div>
            <button class="accessory-btn" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}" onclick="toggleAccessory(this)">
                ${translate('accessories_add')}
            </button>
        </div>
    `).join('');
    
    addAccessoryListeners(container);
}

function renderMice(mice) {
    const container = document.getElementById('mice-grid');
    if (!container) return;
    
    container.innerHTML = mice.map(item => `
        <div class="accessory-item">
            <div class="accessory-image">
                hier könnte<br>ihr produkt<br>sein
                <div class="accessory-info-icon" onclick="showProductInfo(${item.id}, '${item.name.replace(/'/g, "\\'")}', '${item.description.replace(/'/g, "\\'")}')">ℹ️</div>
            </div>
            <div class="accessory-name">${item.name}</div>
            <div class="accessory-price">€${item.price}</div>
            <button class="accessory-btn" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}" onclick="toggleAccessory(this)">
                ${translate('accessories_add')}
            </button>
        </div>
    `).join('');
    
    addAccessoryListeners(container);
}

function renderHeadsets(headsets) {
    const container = document.getElementById('headsets-grid');
    if (!container) return;
    
    container.innerHTML = headsets.map(item => `
        <div class="accessory-item">
            <div class="accessory-image">
                hier könnte<br>ihr produkt<br>sein
                <div class="accessory-info-icon" onclick="showProductInfo(${item.id}, '${item.name.replace(/'/g, "\\'")}', '${item.description.replace(/'/g, "\\'")}')">ℹ️</div>
            </div>
            <div class="accessory-name">${item.name}</div>
            <div class="accessory-price">€${item.price}</div>
            <button class="accessory-btn" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}" onclick="toggleAccessory(this)">
                ${translate('accessories_add')}
            </button>
        </div>
    `).join('');
    
    addAccessoryListeners(container);
}

function renderOther(items) {
    const container = document.getElementById('other-grid');
    if (!container) return;
    
    container.innerHTML = items.map(item => `
        <div class="accessory-item">
            <div class="accessory-image">
                hier könnte<br>ihr produkt<br>sein
                <div class="accessory-info-icon" onclick="showProductInfo(${item.id}, '${item.name.replace(/'/g, "\\'")}', '${item.description.replace(/'/g, "\\'")}')">ℹ️</div>
            </div>
            <div class="accessory-name">${item.name}</div>
            <div class="accessory-price">€${item.price}</div>
            <button class="accessory-btn" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}" onclick="toggleAccessory(this)">
                ${translate('accessories_add')}
            </button>
        </div>
    `).join('');
    
    addAccessoryListeners(container);
}

function addAccessoryListeners(container) {
    container.querySelectorAll('.accessory-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            toggleAccessory(this);
        });
    });
}

function toggleAccessory(button) {
    const id = button.getAttribute('data-id');
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));
    
    if (selectedAccessories.has(id)) {
        selectedAccessories.delete(id);
        button.classList.remove('selected');
        button.textContent = translate('accessories_add');
    } else {
        selectedAccessories.set(id, { name, price });
        button.classList.add('selected');
        button.textContent = translate('accessories_remove');
    }
    
    updateAccessoriesSummary();
    // persist selection so it is visible across pages
    try {
        localStorage.setItem('selectedAccessories', JSON.stringify(Array.from(selectedAccessories.entries())));
    } catch (e) {
        console.error('Error saving selected accessories:', e);
    }
}

function updateAccessoriesSummary() {
    const listContainer = document.getElementById('accessories-selected-list');
    const totalContainer = document.getElementById('accessories-total-price');
    const checkoutSection = document.getElementById('accessories-checkout-section');
    
    if (!listContainer) return;
    
    let total = 0;
    let html = '';
    
    selectedAccessories.forEach((item, id) => {
        html += `<div class="accessory-summary-item">
            <span>${item.name}</span>
            <span>€${item.price.toFixed(2).replace('.', ',')}</span>
        </div>`;
        total += item.price;
    });
    
    listContainer.innerHTML = html || '<p style="color: #999;">' + translate('compatibility_check') + '</p>';
    
    if (totalContainer) {
        if (selectedAccessories.size > 0) {
            totalContainer.innerHTML = `<div class="accessories-price-display">${translate('accessories_total')} €${total.toFixed(2).replace('.', ',')}</div>`;
        } else {
            totalContainer.innerHTML = '';
        }
    }

    if (checkoutSection && selectedAccessories.size > 0) {
        checkoutSection.style.display = 'block';
        const checkoutTotal = document.getElementById('accessories-checkout-total');
        if (checkoutTotal) {
            let componentTotal = 0;
            Object.keys(selected).forEach(componentType => {
                if (selected[componentType]) {
                    const componentsArray = componentsData[componentType + 's'];
                    const component = componentsArray.find(c => c.id == selected[componentType].id);
                    if (component) {
                        componentTotal += component.price;
                    }
                }
            });
            const grandTotal = componentTotal + total;
            checkoutTotal.textContent = '€' + grandTotal.toFixed(2).replace('.', ',');
        }
    } else if (checkoutSection) {
        checkoutSection.style.display = 'none';
    }
}

function showProductInfo(id, name, description) {
    const modal = document.getElementById('productModal');
    if (modal) {
        document.getElementById('modalProductName').textContent = name;
        document.getElementById('modalProductDescription').textContent = description;
        modal.classList.add('active');
    }
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function checkoutFromAccessories() {
    const checkoutData = {
        pcType: currentPCType,
        components: {},
        includeAccessories: true,
        accessories: []
    };

    Object.keys(selected).forEach(componentType => {
        if (selected[componentType]) {
            const componentsArray = componentsData[componentType + 's'];
            const component = componentsArray.find(c => c.id == selected[componentType].id);
            if (component) {
                checkoutData.components[componentType] = component;
            }
        }
    });

    selectedAccessories.forEach((item, id) => {
        checkoutData.accessories.push({
            id: id,
            name: item.name,
            price: item.price
        });
    });

    localStorage.setItem('checkoutData', JSON.stringify(checkoutData));
    localStorage.setItem('pageSource', 'main');

    window.location.href = 'checkout.html';
}

function openFullAccessoriesPage() {
    const checkoutData = {
        pcType: currentPCType,
        components: {},
        includeAccessories: true,
        accessories: []
    };

    Object.keys(selected).forEach(componentType => {
        if (selected[componentType]) {
            const componentsArray = componentsData[componentType + 's'];
            const component = componentsArray.find(c => c.id == selected[componentType].id);
            if (component) {
                checkoutData.components[componentType] = component;
            }
        }
    });

    localStorage.setItem('checkoutData', JSON.stringify(checkoutData));
    localStorage.setItem('selectedAccessories', JSON.stringify(Array.from(selectedAccessories.entries())));
    localStorage.setItem('pageSource', 'accessories');
    window.location.href = 'accessories.html';
}

function toggleMenu() {
    const panel = document.getElementById('menuPanel');
    const overlay = document.getElementById('menuOverlay');
    
    panel.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = panel.classList.contains('active') ? 'hidden' : 'auto';
}

function closeMenu() {
    const panel = document.getElementById('menuPanel');
    const overlay = document.getElementById('menuOverlay');
    
    panel.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function scrollToSection(sectionId, callback) {
    closeMenu();
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
    return false;
}

document.addEventListener('DOMContentLoaded', function() {
    initializePreBuiltPCs();
    initializeAccessories();
    
    const accessoriesNote = document.querySelector('.accessories-note');
    if (accessoriesNote) {
        accessoriesNote.addEventListener('click', openFullAccessoriesPage);
    }
});
