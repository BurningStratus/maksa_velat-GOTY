from back.SQL_Scripts import sql_connection as sql


def load_events():
    # Clearing Old players
    sql.kursori.execute("delete from game;")

    # Clearing old events from database
    sql.kursori.execute("UPDATE airport "
                        "SET event_id = 0;")
    if sql.kursori.rowcount == 1:
        print("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
    else:
        print("-------------------------------------------------------------------------------------------------------")

    # Adds quests
    sql.kursori.execute("update airport set event_id=(select id from event where event_name=airport_name)"
                        " where exists (select 1 from event where event_name=airport_name);")
    if sql.kursori.rowcount == 1:
        print("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
    else:
        print("-------------------------------------------------------------------------------------------------------")

    # Adding bandits
    sql.kursori.execute("UPDATE airport "
                        "SET event_id = 13 "
                        "WHERE event_id = 0 "
                        "ORDER BY RAND() "
                        "LIMIT 5;")
    if sql.kursori.rowcount == 1:
        print("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
    else:
        print("-------------------------------------------------------------------------------------------------------")

    # Adding Black Cat event
    sql.kursori.execute("UPDATE airport "
                        "SET event_id=11 "
                        "WHERE event_id=0 "
                        "ORDER BY RAND() "
                        "LIMIT 1;")
    if sql.kursori.rowcount == 1:
        print("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
    else:
        print("-------------------------------------------------------------------------------------------------------")