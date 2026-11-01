---
title: "PostgreSQL"
description: "Database for large installations."
---

SQLite is enough for most networks. For thousands of devices or many administrators at once, choose **PostgreSQL** in the wizard (or use `--db postgresql`): the installer installs PostgreSQL, creates the `opennccm` database and its user with a random password, and leaves it configured. Decide at installation time: there is no automatic migration from SQLite to PostgreSQL.

With PostgreSQL, the pre-update backups use `pg_dump` and rollback uses `pg_restore`.
