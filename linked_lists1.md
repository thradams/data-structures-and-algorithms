[Single linked list](inked_lists.md)

```c
#include <stdlib.h>
#include <assert.h>


struct book {
    char title[10];
    struct book* next;
};

struct book_list {
    struct book* head, * tail;
};

void book_list_append(struct book_list* list, struct book* book)
{
    assert(book->next == NULL);
    if (list->head == NULL) {
        list->head = book;
        list->tail = book;
    }
    else {
        list->tail->next = book;
        list->tail = book;
    }
}

void book_list_destroy(struct book_list* list)
{
    struct book* it = list->head;
    while (it != NULL)
    {
        struct book* next = it->next;
        free(it);
        it = next;
    }
}


int main(int argc, char* argv[])
{
    struct book_list list = { 0 };
    struct book *b1 = calloc(1, sizeof(struct book));
    book_list_append(&list, b1);    
    book_list_destroy(&list);
}

```

