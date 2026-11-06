// Temario DP-600 (Skills measured), según la guía de estudio oficial de Microsoft Learn.
// Fuente: https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/dp-600
// Los textos de las habilidades están en inglés (tal como aparecen en el examen); las notas están en español.
window.TEMARIO = {
  actualizado: "2026-10-30",
  fuente: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/dp-600",
  dominios: [
    {
      id: "d1", nombre: "Plan, implement, and manage a solution for data analytics", peso: "10–15%",
      secciones: [
        {
          id: "s1", nombre: "Plan a data analytics environment",
          notas: [
            "Capacidades Fabric: SKUs F2 a F2048 (pago por capacidad), además de Trial. Con SKUs F por debajo de F64 los consumidores de Power BI necesitan licencia Pro/PPU; desde F64 (equivalente a P1) los usuarios gratuitos pueden ver contenido.",
            "Admin portal: la configuración se gestiona en 'Tenant settings' (quién puede crear items Fabric, exportar, compartir, usar Copilot, etc.) y en la configuración de capacidad.",
            "Tipos de gateway: on-premises data gateway (modo estándar, compartido por varios usuarios), modo personal (un usuario, solo Power BI) y VNet data gateway (orígenes en red virtual de Azure).",
            "Tema de informe personalizado: archivo JSON que se importa en Power BI Desktop (Ver > Temas > Examinar temas)."
          ],
          habilidades: [
            "Identify requirements for a solution, including components, features, performance, and capacity stock-keeping units (SKUs)",
            "Recommend settings in the Fabric admin portal",
            "Choose a data gateway type",
            "Create a custom Power BI report theme"
          ]
        },
        {
          id: "s2", nombre: "Implement and manage a data analytics environment",
          notas: [
            "Roles de workspace: Admin, Member, Contributor, Viewer. Contributor crea y edita items pero no gestiona accesos; Member puede además compartir items y añadir usuarios con rol inferior; Admin gestiona todo.",
            "Permisos a nivel de item (compartir un lakehouse, warehouse o semantic model con permisos concretos) y seguridad de datos en OneLake / SQL (RLS, CLS, DDM en warehouse y SQL analytics endpoint).",
            "Sensitivity labels: provienen de Microsoft Purview Information Protection y se aplican a semantic models, informes, lakehouses, etc.",
            "Capacidad: pausar/reanudar, escalar SKU, 'smoothing' y 'bursting'; se monitoriza con la Microsoft Fabric Capacity Metrics app."
          ],
          habilidades: [
            "Implement workspace and item-level access controls for Fabric items",
            "Implement data sharing for workspaces, warehouses, and lakehouses",
            "Manage sensitivity labels in semantic models and lakehouses",
            "Configure Fabric-enabled workspace settings",
            "Manage Fabric capacity"
          ]
        },
        {
          id: "s3", nombre: "Manage the analytics development lifecycle",
          notas: [
            "Git integration: a nivel de workspace, con Azure DevOps o GitHub; sincroniza items con una rama.",
            "Power BI Desktop project (.pbip): proyecto en carpetas con archivos de texto (TMDL/TMSL del modelo y definición del informe) pensado para control de versiones.",
            "Deployment pipelines: Dev → Test → Prod; las 'deployment rules' cambian parámetros y conexiones entre etapas sin editar el item.",
            "Impact analysis y lineage view: muestran qué items dependen de otro antes de cambiarlo.",
            "XMLA endpoint (lectura/escritura): despliegue y gestión de semantic models con herramientas externas (SSMS, Tabular Editor, ALM Toolkit).",
            "Activos reutilizables: .pbit (plantilla de informe), .pbids (definición de origen de datos) y semantic models compartidos."
          ],
          habilidades: [
            "Implement version control for a workspace",
            "Create and manage a Power BI Desktop project (.pbip)",
            "Plan and implement deployment solutions",
            "Perform impact analysis of downstream dependencies from lakehouses, data warehouses, dataflows, and semantic models",
            "Deploy and manage semantic models by using the XMLA endpoint",
            "Create and update reusable assets, including Power BI template (.pbit) files, Power BI data source (.pbids) files, and shared semantic models"
          ]
        }
      ]
    },
    {
      id: "d2", nombre: "Prepare and serve data", peso: "40–45%",
      secciones: [
        {
          id: "s4", nombre: "Create objects in a lakehouse or warehouse",
          notas: [
            "Lakehouse: tablas Delta en OneLake, se trabaja con Spark (notebooks) y se consulta con T-SQL a través del SQL analytics endpoint, que es de solo lectura sobre las tablas (puedes crear vistas, funciones y procedimientos, pero no hacer INSERT/UPDATE/DELETE).",
            "Warehouse: T-SQL completo (DDL y DML), procedimientos almacenados, vistas, funciones; transacciones multi-tabla.",
            "Shortcuts: referencias a datos en otro lakehouse/warehouse, ADLS Gen2, Amazon S3, etc., sin copiarlos.",
            "Particionado de Delta: usar columnas de baja cardinalidad (por ejemplo año/mes); evitar columnas de alta cardinalidad.",
            "Ingesta: data pipeline (orquestación y copia a escala), dataflow (low-code, Power Query) o notebook (código)."
          ],
          habilidades: [
            "Ingest data by using a data pipeline, dataflow, or notebook",
            "Create and manage shortcuts",
            "Implement file partitioning for analytics workloads in a lakehouse",
            "Create views, functions, and stored procedures",
            "Enrich data by adding new columns or tables"
          ]
        },
        {
          id: "s5", nombre: "Copy data",
          notas: [
            "Copy activity de un pipeline para mover grandes volúmenes; Copy job para copia simplificada e incremental; COPY INTO en el warehouse para cargar desde archivos.",
            "Dataflow Gen2: transformaciones visuales con Power Query; puede escribir en lakehouse, warehouse y otros destinos.",
            "Notebooks: cuando se necesita lógica compleja con PySpark/Spark SQL.",
            "Un pipeline puede orquestar notebooks, dataflows y procedimientos almacenados con dependencias (éxito, fallo, finalización).",
            "Programación: schedules en pipelines, dataflows y notebooks (también triggers de eventos)."
          ],
          habilidades: [
            "Choose an appropriate method for copying data from a Fabric data source to a lakehouse or warehouse",
            "Copy data by using a data pipeline, dataflow, or notebook",
            "Add stored procedures, notebooks, and dataflows to a data pipeline",
            "Schedule data pipelines",
            "Schedule dataflows and notebooks"
          ]
        },
        {
          id: "s6", nombre: "Transform data",
          notas: [
            "Esquema en estrella: tabla de hechos + dimensiones. SCD tipo 1 sobrescribe el valor (sin historial); SCD tipo 2 inserta una fila nueva con fechas de vigencia o indicador de fila actual (conserva historial).",
            "Tablas puente (bridge): resuelven relaciones muchos-a-muchos entre hechos y dimensiones.",
            "Desnormalizar: combinar atributos para reducir joins; agregar/desagregar según el nivel de detalle requerido.",
            "Calidad: detectar duplicados (dropDuplicates, ROW_NUMBER), nulos (fillna, COALESCE, ISNULL) y valores faltantes.",
            "Conversión de tipos: CAST/TRY_CAST/CONVERT en SQL; .cast() en PySpark.",
            "Upserts en Delta con MERGE."
          ],
          habilidades: [
            "Implement a data cleansing process",
            "Implement a star schema for a lakehouse or warehouse, including Type 1 and Type 2 slowly changing dimensions",
            "Implement bridge tables for a lakehouse or a warehouse",
            "Denormalize data",
            "Aggregate or de-aggregate data",
            "Merge or join data",
            "Identify and resolve duplicate data, missing data, or null values",
            "Convert data types by using SQL or PySpark",
            "Filter data"
          ]
        },
        {
          id: "s7", nombre: "Optimize performance",
          notas: [
            "Delta: muchos archivos pequeños degradan el rendimiento; OPTIMIZE compacta archivos, VACUUM elimina archivos antiguos no referenciados (retención por defecto de 7 días).",
            "V-Order: optimización en la escritura de Parquet que acelera lecturas en los motores de Fabric.",
            "Dataflows: query folding (delegar pasos al origen), staging y orden de pasos.",
            "Notebooks: configuración de Spark, tamaño de archivos, evitar shuffles innecesarios.",
            "SQL: revisar planes de ejecución y query insights en el warehouse."
          ],
          habilidades: [
            "Identify and resolve data loading performance bottlenecks in dataflows, notebooks, and SQL queries",
            "Implement performance improvements in dataflows, notebooks, and SQL queries",
            "Identify and resolve issues with Delta table file sizes"
          ]
        }
      ]
    },
    {
      id: "d3", nombre: "Implement and manage semantic models", peso: "20–25%",
      secciones: [
        {
          id: "s8", nombre: "Design and build semantic models",
          notas: [
            "Modos de almacenamiento: Import, DirectQuery, Dual y Direct Lake (lee tablas Delta de OneLake sin importar copia y con rendimiento cercano a Import). Direct Lake sobre SQL endpoint puede hacer fallback a DirectQuery en ciertos casos (por ejemplo, vistas).",
            "DAX Studio: analizar consultas y tiempos (Server Timings). Tabular Editor 2: editar el modelo, Best Practice Analyzer, grupos de cálculo, scripts.",
            "DAX: variables (VAR/RETURN), iteradores (SUMX, AVERAGEX), CALCULATE y filtros de tabla, funciones de ventana (OFFSET, INDEX, WINDOW) y funciones de información (ISBLANK, ISFILTERED, HASONE).",
            "Calculation groups (evitan multiplicar medidas), dynamic format strings y field parameters (el usuario cambia medidas o ejes en un visual).",
            "Large semantic model storage format para modelos de gran tamaño; composite models con tablas de agregación (Import sobre detalle en DirectQuery).",
            "RLS dinámico: rol con filtro basado en USERPRINCIPALNAME() sobre una tabla de seguridad. OLS: oculta tablas/columnas, se configura con herramientas externas (Tabular Editor/XMLA). Validar con 'Ver como' / 'Test as role'."
          ],
          habilidades: [
            "Choose a storage mode, including Direct Lake",
            "Identify use cases for DAX Studio and Tabular Editor 2",
            "Implement a star schema for a semantic model",
            "Implement relationships, such as bridge tables and many-to-many relationships",
            "Write calculations that use DAX variables and functions, such as iterators, table filtering, windowing, and information functions",
            "Implement calculation groups, dynamic strings, and field parameters",
            "Design and build a large format dataset",
            "Design and build composite models that include aggregations",
            "Implement dynamic row-level security and object-level security",
            "Validate row-level security and object-level security"
          ]
        },
        {
          id: "s9", nombre: "Optimize enterprise-scale semantic models",
          notas: [
            "Performance Analyzer (Desktop) mide el tiempo de cada visual; DAX Studio muestra tiempos del motor de fórmulas y del almacenamiento.",
            "Tabular Editor 2 y su Best Practice Analyzer detectan malas prácticas del modelo.",
            "Incremental refresh: parámetros RangeStart y RangeEnd de tipo fecha/hora, filtro aplicado en una columna de fecha; requiere query folding para ser eficiente.",
            "Reducir cardinalidad, quitar columnas no usadas y preferir medidas a columnas calculadas."
          ],
          habilidades: [
            "Implement performance improvements in queries and report visuals",
            "Improve DAX performance by using DAX Studio",
            "Optimize a semantic model by using Tabular Editor 2",
            "Implement incremental refresh"
          ]
        }
      ]
    },
    {
      id: "d4", nombre: "Explore and analyze data", peso: "20–25%",
      secciones: [
        {
          id: "s10", nombre: "Perform exploratory analytics",
          notas: [
            "Descriptivo: qué pasó. Diagnóstico: por qué pasó (árbol de descomposición, key influencers). Predictivo: qué pasará (forecast, detección de anomalías). Prescriptivo: qué acción tomar.",
            "Profiling: en Power Query, 'Column quality', 'Column distribution' y 'Column profile'; en Spark, describe() y summary().",
            "Se pueden integrar resultados de modelos predictivos en visuales e informes."
          ],
          habilidades: [
            "Implement descriptive and diagnostic analytics",
            "Integrate prescriptive and predictive analytics into a visual or report",
            "Profile data"
          ]
        },
        {
          id: "s11", nombre: "Query data by using SQL",
          notas: [
            "Lakehouse: SQL analytics endpoint (T-SQL de solo lectura sobre tablas). Warehouse: T-SQL completo. Ambos ofrecen el visual query editor (consultas sin código).",
            "Consultas entre items del mismo workspace con nombres de tres partes (base.esquema.tabla).",
            "XMLA endpoint: permite conectar a un semantic model con SSMS, DAX Studio u otras herramientas y ejecutar consultas DAX/MDX."
          ],
          habilidades: [
            "Query a lakehouse in Fabric by using SQL queries or the visual query editor",
            "Query a warehouse in Fabric by using SQL queries or the visual query editor",
            "Connect to and query datasets by using the XMLA endpoint"
          ]
        }
      ]
    }
  ]
};
