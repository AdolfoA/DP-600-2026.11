// Teoría DP-600 · Rutas oficiales "Manage a Microsoft Fabric environment" y "Secure and govern analytics data in Microsoft Fabric".
window.TEORIA = window.TEORIA || [];
window.TEORIA.push(

{
  id: "m19", ruta: "Manage a Microsoft Fabric environment", titulo: "Implement continuous integration and continuous delivery (CI/CD) in Microsoft Fabric",
  url: "https://learn.microsoft.com/en-us/training/modules/implement-cicd-in-fabric/",
  objetivos: ["Definir CI/CD y describir cómo se implementa en Fabric.", "Implementar control de versiones e integración con Git.", "Usar deployment pipelines para automatizar el despliegue.", "Automatizar CI/CD con las API de Fabric."],
  habilidades: ["s3.1", "s3.3", "s3.4"],
  unidades: [
    { t: "Understand Continuous Integration and Continuous Delivery (CI/CD)", c: [
      "CI/CD es el conjunto de prácticas que automatiza la integración de cambios en un repositorio compartido (integración continua) y su entrega a los entornos (entrega continua). En analítica se aplica a items como modelos, informes, notebooks y pipelines.",
      { ul: [
        "Integración continua: los desarrolladores trabajan en ramas, integran con frecuencia y los cambios se validan.",
        "Entrega continua: el contenido avanza de forma controlada por etapas (desarrollo, pruebas, producción).",
        "En Fabric: Git integration para el control de versiones y deployment pipelines para la promoción entre etapas."
      ] }
    ] },
    { t: "Implement version control and Git integration", c: [
      "La integración con Git conecta un workspace a una rama de un repositorio (Azure DevOps o GitHub) y sincroniza los items del workspace con el repositorio.",
      { ul: [
        "Commit: envía al repositorio los cambios hechos en el workspace.",
        "Update: trae al workspace los cambios que hay en la rama.",
        "Cada desarrollador puede trabajar en su propio workspace conectado a su rama (branch out) y fusionar mediante pull request.",
        "Hay que resolver conflictos cuando el mismo item se modifica en ambos lados.",
        "No todos los tipos de item son compatibles con Git: conviene revisar la lista vigente."
      ] },
      { tip: "Git integration trabaja a nivel de workspace, no de item individual." }
    ] },
    { t: "Implement deployment pipelines", c: [
      "Un deployment pipeline organiza etapas (por defecto Desarrollo, Pruebas y Producción), cada una asociada a un workspace.",
      { ul: [
        "Se puede comparar el contenido de dos etapas antes de desplegar.",
        "Deployment rules: configuran parámetros y conexiones de origen distintos para cada etapa.",
        "Se despliega la etapa completa o items seleccionados.",
        "Se pueden definir permisos de acceso al pipeline distintos de los del workspace."
      ] },
      { tip: "Git controla las versiones del código; el deployment pipeline controla la promoción del contenido entre entornos. Se complementan." }
    ] },
    { t: "Automate CI/CD using Fabric APIs", c: [
      "Las API REST de Fabric permiten automatizar operaciones de Git y de deployment pipelines desde herramientas como Azure DevOps Pipelines o GitHub Actions.",
      { ul: [
        "Útil para desplegar sin intervención manual tras aprobar un pull request.",
        "Se autentica con una entidad de servicio (service principal) o con un usuario, según la operación.",
        "Se combina con pruebas automáticas antes de promover el contenido."
      ] },
      { ej: "Haz el ejercicio 'Implement deployment pipelines in Microsoft Fabric': crea un pipeline de tres etapas y promueve un item." }
    ] }
  ]
},

{
  id: "m20", ruta: "Manage a Microsoft Fabric environment", titulo: "Monitor activities in Microsoft Fabric",
  url: "https://learn.microsoft.com/en-us/training/modules/monitor-fabric-items/",
  objetivos: ["Identificar las actividades de Fabric que deben monitorizarse y establecer una línea base.", "Usar el monitoring hub para ver el estado, investigar fallos y revisar el historial.", "Describir cómo Activator automatiza respuestas a eventos de trabajos mediante Real-Time hub."],
  habilidades: ["s2.5", "s7.1"],
  unidades: [
    { t: "Understand monitoring", c: [
      "Monitorizar es obtener visibilidad de la salud de los procesos de datos. Conviene decidir qué actividades vigilar (actualizaciones, pipelines, notebooks, trabajos de Spark) y establecer una línea base de comportamiento normal para detectar desviaciones."
    ] },
    { t: "Use the Microsoft Fabric monitoring hub", c: [
      "El monitoring hub centraliza las actividades de los items de Fabric a los que tienes acceso.",
      { ul: [
        "Muestra estado (en curso, correcto, fallido), duración, tipo de actividad y quién la lanzó.",
        "Permite filtrar y buscar para investigar fallos concretos y revisar ejecuciones históricas.",
        "Desde una ejecución fallida se accede a los detalles y al mensaje de error."
      ] },
      { tip: "Monitoring hub = vista de actividad por workspace/item. Capacity Metrics = consumo de capacidad." }
    ] },
    { t: "Respond to Fabric events with Activator", c: [
      "Activator (Fabric Activator) permite definir reglas que reaccionan a eventos y ejecutan acciones automáticas.",
      { ul: [
        "Los eventos de trabajos (por ejemplo, un fallo en un pipeline o un error en un notebook) se publican en el Real-Time hub.",
        "Una regla puede enviar una alerta por correo o por Teams, o lanzar otra acción de remediación."
      ] },
      { ej: "Haz el ejercicio 'Monitor Fabric activity in the monitoring hub'." }
    ] }
  ]
},

{
  id: "m21", ruta: "Manage a Microsoft Fabric environment", titulo: "Secure data access in Microsoft Fabric",
  url: "https://learn.microsoft.com/en-us/training/modules/secure-data-access-in-fabric/",
  objetivos: ["Describir el modelo de seguridad de Fabric y sus capas de control de acceso.", "Configurar roles de workspace y permisos de item.", "Aplicar permisos granulares con T-SQL y roles de seguridad de OneLake."],
  habilidades: ["s2.1", "s2.2"],
  unidades: [
    { t: "Understand the Fabric security model", c: [
      "La seguridad de Fabric funciona por capas: cada capa añade restricciones y un usuario necesita pasar por todas.",
      { ul: [
        "Microsoft Entra ID: autenticación e identidad; acceso condicional y MFA.",
        "Acceso a Fabric y a la capacidad.",
        "Workspace: roles que definen lo que se puede hacer en él.",
        "Item: permisos específicos de un lakehouse, warehouse, semantic model, etc.",
        "Datos: permisos granulares, como los roles de seguridad de OneLake, T-SQL (GRANT/DENY, RLS, CLS, DDM) o la seguridad del semantic model."
      ] }
    ] },
    { t: "Configure workspace and item permissions", c: [
      "Los roles de workspace son la forma principal de dar acceso amplio.",
      { tabla: [
        ["Rol", "Qué puede hacer (resumen)"],
        ["Admin", "Control total: configurar el workspace, gestionar accesos, eliminar."],
        ["Member", "Crear y editar contenido; compartir items y añadir usuarios con rol inferior."],
        ["Contributor", "Crear y editar contenido; sin gestionar accesos."],
        ["Viewer", "Ver contenido y consultar datos; sin modificar."]
      ] },
      "Además se puede compartir un item concreto con un usuario y asignarle solo permisos específicos (por ejemplo, lectura de datos o permiso de compilación) sin darle acceso al workspace completo.",
      { tip: "Compartir un item es más restrictivo que dar un rol de workspace. Aplica el mínimo privilegio." }
    ] },
    { t: "Apply granular permissions", c: [
      "Cuando el acceso a nivel de workspace o item es demasiado amplio, se limita el acceso a los datos.",
      { ul: [
        "T-SQL en warehouse y SQL analytics endpoint: GRANT, DENY y REVOKE a nivel de esquema, tabla, columna, además de RLS, CLS y enmascaramiento dinámico.",
        "Roles de seguridad de OneLake (OneLake security): definen a qué carpetas y tablas de un lakehouse tiene acceso cada grupo de usuarios, aplicado a todos los motores que leen de OneLake.",
        "Los permisos de item (como ReadAll) influyen en cómo se aplican estas restricciones."
      ] },
      { ej: "Haz el ejercicio 'Secure data access in Microsoft Fabric': asigna roles, comparte un item y crea un rol de OneLake." }
    ] }
  ]
},

{
  id: "m22", ruta: "Secure and govern analytics data in Microsoft Fabric", titulo: "Govern analytics data in Microsoft Fabric",
  url: "https://learn.microsoft.com/en-us/training/paths/secure-govern-analytics-data/",
  objetivos: ["Aplicar etiquetas de sensibilidad para clasificar y proteger items de Fabric.", "Usar endorsement, etiquetas y documentación para señalar confianza y facilitar el descubrimiento.", "Monitorizar el estado de gobierno desde la sección Govern del OneLake catalog.", "Entender cómo la sección Secure centraliza la gestión de accesos."],
  habilidades: ["s2.3"],
  unidades: [
    { t: "Classify and protect data in Microsoft Fabric", c: [
      "Las etiquetas de sensibilidad (sensitivity labels) provienen de Microsoft Purview Information Protection. Clasifican el contenido (por ejemplo, Público, Confidencial) y pueden aplicar protección.",
      { ul: [
        "Se aplican a items como semantic models, informes, lakehouses y warehouses.",
        "Pueden heredarse de forma descendente: el contenido derivado de un item etiquetado (por ejemplo, un informe sobre un modelo) puede heredar la etiqueta.",
        "Los administradores definen qué usuarios pueden aplicar etiquetas mediante la configuración del tenant."
      ] },
      { tip: "Etiquetas de sensibilidad → Microsoft Purview Information Protection. Es una respuesta recurrente." }
    ] },
    { t: "Endorse and document data assets", c: [
      "El endorsement señala qué contenido es de confianza, y la documentación facilita encontrarlo y entenderlo.",
      { ul: [
        "Promoted (promovido): lo marca el propietario como listo para uso general.",
        "Certified (certificado): lo marca un usuario autorizado por el administrador tras revisarlo.",
        "Master data: marca los datos como fuente oficial de un tipo de dato de la organización.",
        "Descripciones y etiquetas (tags) ayudan a descubrir los items."
      ] }
    ] },
    { t: "Monitor and manage governance", c: [
      "El OneLake catalog reúne el descubrimiento y el gobierno de los items.",
      { ul: [
        "Sección Govern: ofrece información sobre la postura de gobierno, como qué proporción de items tiene etiqueta o endorsement.",
        "Sección Secure: centraliza la gestión de accesos.",
        "El linaje (lineage view) y el impact analysis muestran las dependencias entre items."
      ] },
      { ej: "Haz el ejercicio 'Govern analytics data in Microsoft Fabric': aplica una etiqueta, certifica un item y revisa la sección Govern." }
    ] }
  ]
},

{
  id: "m23", ruta: "Manage a Microsoft Fabric environment", titulo: "Administración del entorno de Fabric (complemento)",
  url: "https://learn.microsoft.com/en-us/search/?terms=Fabric%20admin%20portal%20tenant%20settings%20capacity",
  objetivos: ["Describir la jerarquía de administración de Fabric e identificar el rol de administrador adecuado para cada tarea.", "Configurar tenant settings, dominios y delegar derechos de administración.", "Gestionar licencias y controlar cómo los usuarios acceden y comparten contenido.", "Monitorizar el uso de la plataforma, gestionar la salud de la capacidad y aplicar controles de gobierno."],
  habilidades: ["s1.1", "s1.2", "s2.4", "s2.5"],
  unidades: [
    { t: "Understand the Fabric admin model", c: [
      "La administración se reparte en distintos niveles para delegar responsabilidades.",
      { ul: [
        "Administrador de Fabric: gestiona la configuración global del tenant.",
        "Administrador de capacidad: gestiona una capacidad concreta, sus ajustes y quién puede usarla.",
        "Administrador de dominio: gestiona un dominio (agrupación lógica de workspaces por área de negocio).",
        "Administrador de workspace: gestiona un workspace."
      ] }
    ] },
    { t: "Configure tenant settings and delegate admin rights", c: [
      "Los Tenant settings del portal de administración controlan qué funciones están disponibles y para quién.",
      { ul: [
        "Cada configuración se puede habilitar para toda la organización o solo para grupos de seguridad concretos (o excluyendo grupos).",
        "Algunas se pueden delegar a nivel de dominio, capacidad o workspace.",
        "Se usan para controlar, por ejemplo, la creación de items de Fabric, la exportación de datos, el uso de Copilot o el uso compartido."
      ] },
      { tip: "Recomendar ajustes del portal de administración es una habilidad de la guía: piensa en habilitar por grupos de seguridad, no a todo el tenant, cuando se requiera control." }
    ] },
    { t: "Manage user access and licensing", c: [
      "El acceso depende de la licencia y de los permisos.",
      { ul: [
        "Licencias de Power BI: gratuita, Pro y Premium por usuario (PPU).",
        "Con capacidades F por debajo de F64, quien consume contenido necesita Pro o PPU; desde F64 pueden consumir usuarios con licencia gratuita.",
        "Quien crea o comparte contenido necesita licencia Pro o PPU en las capacidades pequeñas.",
        "Los controles de uso compartido regulan quién puede compartir con usuarios externos o fuera de su grupo."
      ] }
    ] },
    { t: "Monitor and govern your Fabric environment", c: [
      "Para mantener la salud de la plataforma se combinan varias herramientas.",
      { ul: [
        "Admin monitoring workspace: informes del uso de la plataforma.",
        "Microsoft Fabric Capacity Metrics app: consumo y salud de la capacidad.",
        "Gestión de la capacidad: pausar, reanudar y escalar el SKU; distribuir workspaces entre capacidades.",
        "Controles de gobierno: etiquetas de sensibilidad, endorsement y políticas de acceso."
      ] }
    ] }
  ]
}

);
