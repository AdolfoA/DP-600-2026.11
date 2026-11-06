// Teoría DP-600 · Ruta oficial "Work with semantic models in Microsoft Fabric" (5 módulos).
// Learn indica que esta ruta ayuda a preparar la certificación Fabric Analytics Engineer.
window.TEORIA = window.TEORIA || [];
window.TEORIA.push(

{
  id: "m14", ruta: "Work with semantic models in Microsoft Fabric", titulo: "Create DAX calculations in semantic models",
  url: "https://learn.microsoft.com/en-us/training/modules/dax-power-bi-create-calculations/",
  objetivos: ["Crear tablas calculadas.", "Crear columnas calculadas.", "Crear medidas con DAX."],
  habilidades: ["s8.5"],
  unidades: [
    { t: "Create calculated tables", c: [
      "Una tabla calculada se define con una expresión DAX que devuelve una tabla. Se evalúa durante la actualización del modelo y se almacena en él, así que ocupa memoria.",
      { ul: [
        "Usos típicos: tabla de fechas (CALENDAR, CALENDARAUTO), dimensiones de apoyo, copias de una tabla para relaciones con rol (role-playing).",
        "No se recomienda para volúmenes grandes: es preferible preparar los datos en el origen o en Power Query."
      ] },
      { code: "Fechas = CALENDAR(DATE(2022,1,1), DATE(2026,12,31))" }
    ] },
    { t: "Create calculated columns", c: [
      "Una columna calculada añade una columna a una tabla y se evalúa fila a fila (contexto de fila) durante la actualización. El resultado se almacena en el modelo.",
      { ul: [
        "Útil para agrupar, segmentar o filtrar (por ejemplo, rangos de edad).",
        "Aumenta el tamaño del modelo y el tiempo de actualización.",
        "Si el cálculo es un agregado para mostrar en un visual, casi siempre es mejor una medida."
      ] },
      { code: "Rango precio = IF(Producto[Precio] < 50, \"Bajo\", IF(Producto[Precio] < 200, \"Medio\", \"Alto\"))" },
      { tip: "Columna calculada = contexto de fila, se guarda. Medida = contexto de filtro, se calcula al consultar." }
    ] },
    { t: "Understand implicit measures", c: [
      "Una medida implícita aparece cuando se arrastra una columna numérica a un visual y Power BI aplica una agregación automática (suma, promedio…) según la propiedad de resumen de la columna.",
      { ul: [
        "No se puede reutilizar en otras medidas DAX ni se muestra de forma coherente en herramientas externas.",
        "Es una mala práctica en modelos empresariales: se recomienda ocultar las columnas numéricas de origen y exponer medidas explícitas."
      ] }
    ] },
    { t: "Create explicit measures", c: [
      "Una medida explícita se escribe con DAX y se evalúa al consultar, en el contexto de filtro del visual. Es reutilizable y da control total sobre la lógica.",
      { code: "Ventas = SUM(Ventas[Importe])\nMargen % = DIVIDE([Ventas] - [Coste], [Ventas])\nVentas año anterior = CALCULATE([Ventas], SAMEPERIODLASTYEAR(Fechas[Fecha]))" },
      { ul: [
        "CALCULATE modifica el contexto de filtro y es la función central de DAX.",
        "DIVIDE evita errores por división entre cero.",
        "Las variables VAR/RETURN mejoran la legibilidad y el rendimiento al evaluar una expresión una sola vez."
      ] }
    ] },
    { t: "Use iterator functions", c: [
      "Los iteradores (SUMX, AVERAGEX, MAXX, MINX, COUNTX, RANKX) recorren una tabla fila a fila, evalúan una expresión en cada fila y luego agregan el resultado.",
      { code: "Ventas netas = SUMX(Ventas, Ventas[Cantidad] * Ventas[Precio] * (1 - Ventas[Descuento]))" },
      { ul: [
        "Crean un contexto de fila sobre la tabla que recorren.",
        "Son necesarios cuando la fórmula combina columnas de la misma fila antes de agregar.",
        "Sobre tablas muy grandes pueden ser costosos: se revisan con DAX Studio."
      ] },
      { ej: "Haz el ejercicio 'Create DAX calculations': crea una tabla calculada, una columna, medidas y un iterador." }
    ] }
  ]
},

{
  id: "m15", ruta: "Work with semantic models in Microsoft Fabric", titulo: "Design semantic models for scale in Microsoft Fabric",
  url: "https://learn.microsoft.com/en-gb/training/modules/design-semantic-models-scale/",
  objetivos: ["Elegir un modo de almacenamiento según frescura, rendimiento y ubicación del origen.", "Diseñar relaciones en esquema en estrella para claridad y rendimiento.", "Diseñar cálculos que sigan siendo eficientes y mantenibles al crecer el volumen y el equipo.", "Configurar ajustes del modelo para consumo a gran escala."],
  habilidades: ["s8.1", "s8.3", "s8.4", "s8.5", "s8.6", "s8.7", "s8.8", "s9.4"],
  unidades: [
    { t: "Choose a storage mode", c: [
      "El modo de almacenamiento define dónde residen los datos y cómo se consultan. Es una de las decisiones más importantes del diseño.",
      { tabla: [
        ["Modo", "Dónde están los datos", "Ventajas", "Inconvenientes"],
        ["Import", "Copia en memoria del modelo", "Consultas muy rápidas; DAX completo", "Requiere actualización; límite de tamaño"],
        ["DirectQuery", "En el origen; se consulta en tiempo real", "Datos siempre actuales; sin copia", "Depende del rendimiento del origen"],
        ["Dual", "Tabla que actúa como Import o DirectQuery según la consulta", "Optimiza dimensiones en modelos compuestos", "Solo tiene sentido en composite models"],
        ["Direct Lake", "Tablas Delta de OneLake, leídas directamente", "Rendimiento cercano a Import sin copia ni refresco de importación", "Requiere datos en OneLake en formato Delta"]
      ] },
      "Un composite model combina varios modos en un mismo modelo (por ejemplo, hechos en DirectQuery y dimensiones en Dual o Import).",
      { ul: [
        "Direct Lake sobre OneLake: lee los archivos Delta directamente.",
        "Direct Lake sobre SQL endpoint: ciertas condiciones (como usar vistas del endpoint) pueden provocar un fallback a DirectQuery.",
        "Para decidir, valora frescura requerida, volumen de datos, rendimiento esperado y dónde residen los datos."
      ] },
      { tip: "Frescura en tiempo real → DirectQuery. Máximo rendimiento con datos importables → Import. Datos ya en OneLake y gran volumen → Direct Lake." }
    ] },
    { t: "Design star schema for semantic models", c: [
      "Un modelo en estrella separa hechos y dimensiones, y es la estructura más eficiente para el motor tabular y la más clara para el usuario.",
      { ul: [
        "Relaciones uno-a-muchos desde la dimensión (lado uno) hacia el hecho (lado muchos), con dirección de filtro única.",
        "Evitar relaciones bidireccionales y muchos-a-muchos salvo que sean imprescindibles; se resuelven con tablas puente.",
        "Tabla de fechas dedicada, marcada como tabla de fechas, con relación al campo de fecha del hecho.",
        "Relaciones con rol (role-playing): una relación activa y las demás inactivas, que se activan en una medida con USERELATIONSHIP.",
        "Ocultar columnas técnicas (claves) y usar nombres claros."
      ] },
      { code: "Ventas por fecha de envío =\nCALCULATE([Ventas], USERELATIONSHIP(Ventas[FechaEnvio], Fechas[Fecha]))" },
      { tip: "Una tabla puente resuelve una relación muchos-a-muchos sin recurrir a una relación directa muchos-a-muchos." }
    ] },
    { t: "Design scalable calculations", c: [
      "Los cálculos deben seguir siendo rápidos y mantenibles cuando crecen los datos y el equipo.",
      { ul: [
        "Preferir medidas a columnas calculadas para agregaciones.",
        "Calculation groups: aplican variaciones (YTD, año anterior, % de cambio) a muchas medidas sin duplicarlas. Se crean con Tabular Editor.",
        "Dynamic format strings: cambian el formato de una medida según el contexto (moneda, porcentaje).",
        "Field parameters: dejan que el usuario cambie qué medida o qué eje ve un visual.",
        "Medidas con variables, nombres consistentes, carpetas de visualización y una tabla de medidas para organizar el modelo."
      ] },
      { tip: "Cientos de medidas repetidas con distintas inteligencias de tiempo → calculation group." }
    ] },
    { t: "Configure settings for scale", c: [
      "Hay ajustes del modelo y del servicio que preparan un modelo para muchos usuarios y gran volumen.",
      { ul: [
        "Large semantic model storage format: permite superar el límite de tamaño de modelos estándar hasta el límite de la capacidad y mejora la escalabilidad; es requisito de otras funciones como el escalado de consultas.",
        "Actualización incremental (incremental refresh): solo actualiza las particiones recientes en lugar de recargar todo.",
        "Agregaciones y modelos compuestos para acelerar consultas sobre grandes tablas en DirectQuery.",
        "Endpoint XMLA de lectura/escritura para gestionar y desplegar con herramientas externas."
      ] },
      { ej: "Haz el ejercicio 'Design a semantic model for scale in Fabric': elige un modo de almacenamiento y diseña relaciones y cálculos." }
    ] }
  ]
},

{
  id: "m16", ruta: "Work with semantic models in Microsoft Fabric", titulo: "Optimize semantic model performance",
  url: "https://learn.microsoft.com/en-gb/training/modules/optimize-semantic-model-performance/",
  objetivos: ["Usar Performance Analyzer para identificar cuellos de botella.", "Optimizar cálculos DAX.", "Reducir la cardinalidad para mejorar la eficiencia del modelo.", "Implementar agregaciones para acelerar consultas sobre grandes volúmenes.", "Aplicar un enfoque sistemático para resolver problemas de rendimiento."],
  habilidades: ["s9.1", "s9.2", "s9.3", "s8.8"],
  unidades: [
    { t: "Use Performance analyzer to diagnose issues", c: [
      "Performance Analyzer, en Power BI Desktop, registra el tiempo que tarda cada elemento de la página y lo desglosa en tres partes.",
      { ul: [
        "DAX query: tiempo del motor en responder a la consulta del visual.",
        "Visual display: tiempo de dibujar el visual.",
        "Other: tiempo de otras tareas, como esperar a otros visuales."
      ] },
      "Si el tiempo está en 'DAX query', el problema es el modelo o la medida; si está en 'Visual display', el problema es el propio visual o su configuración. La consulta DAX de un visual se puede copiar y analizar en DAX Studio.",
      { tip: "Performance Analyzer diagnostica a nivel de visual. DAX Studio diagnostica a nivel de consulta (formula engine / storage engine)." }
    ] },
    { t: "Optimize DAX calculations", c: [
      "Pequeños cambios en una medida pueden reducir mucho el tiempo de consulta.",
      { ul: [
        "Usar variables para no repetir cálculos.",
        "Filtrar columnas en lugar de tablas completas dentro de CALCULATE.",
        "Usar DIVIDE en lugar de IF con división.",
        "Evitar iteradores sobre tablas enormes cuando una agregación simple resuelve el caso.",
        "Medir antes y después con Server Timings de DAX Studio."
      ] },
      { code: "-- Menos eficiente: filtra la tabla completa\nVentas altas = CALCULATE([Ventas], FILTER(Ventas, Ventas[Importe] > 1000))\n\n-- Más eficiente: filtra una sola columna\nVentas altas = CALCULATE([Ventas], Ventas[Importe] > 1000)" }
    ] },
    { t: "Reduce cardinality for better performance", c: [
      "La cardinalidad es el número de valores distintos de una columna. Las columnas con muchos valores únicos ocupan más memoria y comprimen peor.",
      { ul: [
        "Eliminar columnas que no se usan.",
        "Separar fecha y hora, o redondear la hora, en lugar de guardar marcas de tiempo con milisegundos.",
        "Reducir la precisión de decimales cuando no aporta valor.",
        "Usar claves enteras en lugar de texto.",
        "Resumir los datos en el origen o en Power Query cuando no se necesita el detalle."
      ] },
      "Herramientas como VertiPaq Analyzer (en DAX Studio o Tabular Editor) muestran el tamaño de cada columna y ayudan a priorizar."
    ] },
    { t: "Implement aggregations", c: [
      "Las agregaciones definidas por el usuario permiten que consultas resumidas se respondan desde una tabla pequeña en memoria, y solo las consultas de detalle van al origen.",
      { ul: [
        "La tabla de agregación se carga en Import y la tabla de detalle queda en DirectQuery.",
        "Se configuran con 'Manage aggregations', asignando cada columna a una función (Sum, Min, Max, Count, GroupBy) y a la columna de detalle.",
        "Las dimensiones que se relacionan con ambas tablas suelen ir en modo Dual."
      ] },
      { tip: "Tabla enorme en DirectQuery lenta para consultas resumidas → tabla de agregación en Import dentro de un composite model." }
    ] },
    { t: "Troubleshoot common performance issues", c: [
      "Un enfoque sistemático: medir, identificar el cuello de botella, aplicar un cambio y volver a medir.",
      { ul: [
        "Demasiados visuales en una página o interacciones cruzadas innecesarias.",
        "Relaciones bidireccionales o muchos-a-muchos que complican los filtros.",
        "Medidas con iteradores o filtros sobre tablas completas.",
        "Columnas de alta cardinalidad y columnas calculadas innecesarias.",
        "Tabular Editor y su Best Practice Analyzer ayudan a detectar problemas de modelo de forma automática."
      ] },
      { ej: "Haz el ejercicio 'Diagnose and fix a slow report' con Performance Analyzer y DAX Studio." }
    ] }
  ]
},

{
  id: "m17", ruta: "Work with semantic models in Microsoft Fabric", titulo: "Enforce semantic model security",
  url: "https://learn.microsoft.com/en-gb/training/modules/enforce-semantic-model-security/",
  objetivos: ["Implementar seguridad a nivel de fila con expresiones de filtro DAX y patrones dinámicos.", "Aplicar seguridad a nivel de objeto para ocultar tablas y columnas.", "Validar roles de seguridad y gestionar su membresía."],
  habilidades: ["s8.9", "s8.10"],
  unidades: [
    { t: "Implement row-level security", c: [
      "La RLS limita qué filas ve cada usuario en un semantic model. Se definen roles con expresiones de filtro DAX sobre una o varias tablas.",
      { ul: [
        "RLS estática: el filtro tiene un valor fijo por rol (por ejemplo, Region = \"Norte\"). Requiere un rol por cada valor.",
        "RLS dinámica: un único rol filtra según el usuario que consulta, con USERPRINCIPALNAME() o USERNAME(), cruzado con una tabla de seguridad que relaciona usuarios y datos permitidos.",
        "Los filtros de un rol se propagan por las relaciones desde la tabla filtrada hacia las relacionadas (según la dirección de la relación)."
      ] },
      { code: "-- Filtro del rol sobre la tabla Seguridad\n[Email] = USERPRINCIPALNAME()" },
      { tip: "Los usuarios con rol Admin, Member o Contributor en el workspace tienen permiso de escritura sobre el modelo y no se ven afectados por la RLS. La RLS afecta a quienes consumen con permisos de lectura (Viewer o acceso al modelo)." }
    ] },
    { t: "Apply object-level security", c: [
      "La OLS oculta tablas o columnas enteras a ciertos roles: para esos usuarios los objetos ni siquiera existen.",
      { ul: [
        "No se configura desde la interfaz de Power BI Desktop: se hace con herramientas externas como Tabular Editor o a través del endpoint XMLA.",
        "Se combina con RLS cuando se necesita seguridad de filas y de columnas.",
        "Útil para ocultar columnas sensibles (salarios, datos personales) a ciertos grupos."
      ] },
      { tip: "OLS = ocultar objetos (tablas/columnas). RLS = restringir filas. Si la pregunta menciona ocultar una columna a un rol, es OLS con Tabular Editor." }
    ] },
    { t: "Test security and manage roles", c: [
      "Antes de publicar hay que validar que cada rol devuelve lo esperado.",
      { ul: [
        "En Power BI Desktop: 'Ver como' (View as) permite probar uno o varios roles, y un usuario concreto en RLS dinámica.",
        "En el servicio: 'Test as role' desde la configuración de seguridad del semantic model.",
        "Los miembros de los roles (usuarios y grupos de Microsoft Entra) se gestionan en el servicio, no en Desktop.",
        "Para Direct Lake, la seguridad definida en el SQL analytics endpoint puede provocar que las consultas pasen a DirectQuery."
      ] },
      { ej: "Haz el ejercicio 'Implement RLS for a semantic model': crea un rol dinámico y valídalo con un usuario de prueba." }
    ] }
  ]
},

{
  id: "m18", ruta: "Work with semantic models in Microsoft Fabric", titulo: "Manage the semantic model development lifecycle",
  url: "https://learn.microsoft.com/en-gb/training/modules/manage-semantic-model-lifecycle/",
  objetivos: ["Crear activos reutilizables de Power BI.", "Gestionar el contenido de Power BI con control de versiones.", "Gestionar semantic models con el endpoint XMLA.", "Desplegar contenido por etapas.", "Mantener y monitorizar semantic models."],
  habilidades: ["s3.1", "s3.2", "s3.3", "s3.5", "s3.6"],
  unidades: [
    { t: "Create reusable Power BI assets", c: [
      "Los activos reutilizables dan coherencia y ahorran trabajo en un entorno con muchos autores.",
      { ul: [
        ".pbit (plantilla de Power BI): informe sin datos, con modelo, consultas y parámetros; al abrirla pide los valores de los parámetros.",
        ".pbids (origen de datos de Power BI): archivo con la definición de conexión a un origen, para que otros se conecten sin configurarlo desde cero.",
        "Semantic models compartidos: un único modelo certificado sobre el que varios informes delgados (thin reports) se conectan.",
        "Temas JSON para unificar la apariencia de los informes."
      ] },
      { tip: ".pbit = plantilla de informe. .pbids = definición de origen. .pbip = proyecto para control de versiones." }
    ] },
    { t: "Manage Power BI content in version control", c: [
      "El formato de proyecto de Power BI Desktop (.pbip) guarda modelo e informe como carpetas de archivos de texto, adecuados para control de versiones.",
      { ul: [
        "El modelo se serializa con TMDL (o TMSL) y el informe con su propia definición de archivos.",
        "Permite diferencias legibles, ramas, revisiones y colaboración con Git.",
        "Fabric ofrece también integración con Git a nivel de workspace (Azure DevOps y GitHub), que sincroniza los items con una rama."
      ] }
    ] },
    { t: "Manage semantic models with the XMLA endpoint", c: [
      "El endpoint XMLA expone el modelo con el protocolo de Analysis Services y permite gestionarlo con herramientas externas.",
      { ul: [
        "Debe habilitarse en la capacidad en modo lectura/escritura para poder modificar el modelo.",
        "Herramientas: SQL Server Management Studio, Tabular Editor, ALM Toolkit, DAX Studio.",
        "Permite desplegar modelos con todos sus metadatos, comparar versiones, gestionar particiones y refrescar de forma selectiva.",
        "Cambios hechos por XMLA a un modelo creado en Desktop impiden volver a descargarlo como PBIX."
      ] }
    ] },
    { t: "Deploy content through stages", c: [
      "Los deployment pipelines mueven contenido por etapas, normalmente Desarrollo, Pruebas y Producción, cada una asociada a un workspace.",
      { ul: [
        "Comparan etapas y muestran qué ha cambiado antes de desplegar.",
        "Las deployment rules sustituyen parámetros y conexiones de origen al pasar de una etapa a otra.",
        "Se pueden desplegar items concretos o toda la etapa."
      ] },
      { tip: "Cambiar la conexión de origen entre Test y Producción sin tocar el modelo → deployment rules." }
    ] },
    { t: "Maintain and monitor semantic models", c: [
      "Una vez en producción hay que vigilar actualizaciones, rendimiento y uso.",
      { ul: [
        "Historial de actualización del semantic model y alertas ante fallos.",
        "Fabric Capacity Metrics app para ver el consumo de la capacidad.",
        "Semantic link (librería sempy en notebooks) permite leer y operar sobre modelos desde Python.",
        "Impact analysis y lineage view para evaluar el efecto de un cambio en elementos dependientes."
      ] },
      { ej: "Haz el ejercicio 'Manage semantic models through their lifecycle': plantilla, proyecto, XMLA y despliegue." }
    ] }
  ]
}

);
